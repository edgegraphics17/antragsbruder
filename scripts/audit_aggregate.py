#!/usr/bin/env python3
import json, re, collections, hashlib, html as ihtml, urllib.request, ssl, os

BASE='/Users/karim/Claude/Projects/Antragsbruder/raw'
d=json.load(open(f'{BASE}/analysis.json'))
rows=d['rows']; R={r['url']:r for r in rows}
HOST='https://www.antragsbruder.de'
LOC=['en','ar','tr','ru','uk','pl','bg','ro']

def path(u): return u.replace(HOST,'') or '/'
def base_path(p):
    m=re.match(r'^/(en|ar|tr|ru|uk|pl|bg|ro)(/.*|)$',p)
    return m.group(2) or '/' if m else p

# status map incl. 404s already known
status={}
for r in rows: status[r['url']]=r['status']

# A) locale matrix
paths=collections.defaultdict(dict)
for u,s in status.items():
    p=path(u); b=base_path(p)
    m=re.match(r'^/(en|ar|tr|ru|uk|pl|bg|ro)(/.*|)$',p)
    loc='de' if not m else 'de' if m.group(2)in('','/') else m.group(1)
    if not m: loc='de'
    else: loc=m.group(1) if m.group(2) not in ('','/') else m.group(1)
    if not m: loc='de'
    paths[b][loc]=s
# fix: locale root paths /en etc map to path '/' with loc en
paths2=collections.defaultdict(dict)
for u,s in status.items():
    p=path(u)
    m=re.match(r'^/(en|ar|tr|ru|uk|pl|bg|ro)(/.*|)$',p)
    if m: b=m.group(2) or '/'; loc=m.group(1)
    else: b=p; loc='de'
    paths2[b][loc]=s
mirrored=[b for b,v in paths2.items() if len([l for l,s in v.items() if s==200])==9]
de_only=[b for b,v in paths2.items() if v.get('de')==200 and len([l for l,s in v.items() if s==200])<9]
print('paths with all 9 locales 200:',len(mirrored))
print('de-only / partially:',sorted(de_only))

# B) hreflang & canonical checks (de pages with 200)
issues_hl=[]; issues_can=[]
for r in rows:
    if r['status']!=200: continue
    hl=dict()
    for part in [x for x in r['hreflang'].split(';') if x]:
        k,v=part.split('=',1); hl[k]=v
    self_can=r['canonical'].rstrip('/')
    cur=r['url'].rstrip('/')
    if not r['canonical'] and r['url'] not in (HOST+'/datenbank',):
        pass
    if r['canonical'] and r['canonical'].rstrip('/')!=cur:
        issues_can.append((r['url'],r['canonical']))
    if hl:
        if 'de' not in hl and cur==HOST:
            pass
        if hl.get('de','').rstrip('/')!=cur and 'de' in hl:
            issues_hl.append(('de-mismatch',r['url'],hl.get('de')))
        for k,v in hl.items():
            if k in ('de','x-default'): continue
            vu=v if v.startswith('http') else HOST+v
            if status.get(vu.rstrip('/'), status.get(vu,'?'))==404:
                issues_hl.append(('target-404',r['url'],k,v))
            elif vu.rstrip('/')!=cur and vu.rstrip('/') not in status:
                issues_hl.append(('target-not-in-sitemap',r['url'],k,v))
    else:
        issues_hl.append(('no-hreflang',r['url'],'',''))
print('\ncanonical-mismatch count:',len(issues_can), issues_can[:6])
print('pages with NO hreflang:',sum(1 for i in issues_hl if i[0]=='no-hreflang'))
no_hl=[i[1] for i in issues_hl if i[0]=='no-hreflang']
print('  of which 200-status pages:',[u for u in no_hl if status.get(u)==200][:30])
t404=[i for i in issues_hl if i[0]=='target-404']
print('hreflang->404 targets:',len(t404),'e.g.',t404[:4])

# C) thin pages / H1 / empty metas
thin=[(r['url'],r['words']) for r in rows if r['status']==200 and r['words']<300]
noh1=[r['url'] for r in rows if r['status']==200 and r['h1']!=1]
notitle=[r['url'] for r in rows if r['status']==200 and not r['title']]
nodesc=[r['url'] for r in rows if r['status']==200 and not r['description']]
nocanon=[r['url'] for r in rows if r['status']==200 and not r['canonical']]
print('\nthin<300w:',len(thin))
for t in thin[:25]: print('  ',t)
print('H1 != 1:',len(noh1)); [print('  ',u,R[u]['h1'],R[u]['words']) for u in noh1[:20]]
print('no title:',notitle[:10]); print('no desc:',nodesc[:10]); print('no canonical:',[u for u in nocanon if status[u]==200][:20])

# D) broken internal links: targets not in status map
seen=set(status)
allt=d['internal']
broken={}
for t,srcs in allt.items():
    if t.rstrip('/') not in [k.rstrip('/') for k in seen]:
        broken[t]=srcs
print('\ninternal targets NOT in sitemap-crawl set:',len(broken))
for t,srcs in list(broken.items())[:40]: print('  ',t,'<-',len(srcs),'pages')

# E) locale content identity: same path, same text hash?
ident=[]
for b,v in paths2.items():
    hs={}
    for loc,s in v.items():
        if s!=200: continue
        u=HOST+(b if b!='/' else ('' if loc=='de' else '/'+loc))
        if loc!='de': u=HOST+'/'+loc+b if b!='/' else HOST+'/'+loc
        r=R.get(u) or R.get(u.rstrip('/'))
        if r: hs[loc]=r['text_hash']
    vals=list(hs.values())
    if len(vals)>1:
        uniq=len(set(vals))
        if uniq<len(vals): ident.append((b,hs))
print('\nlocale groups with identical visible-text:',len(ident))
for b,hs in ident[:15]: print('  ',b,hs)

# F) price grep in visible text (scripts already stripped in saved html? rows lack text; recompute visible)
TERMS=['€','EUR','Preis','preis','kostenlos','kostenpflichtig','Honorar','pauschal','Festpreis','Tarif','Paket','Angebot','79','149','29','49','199','99']
def visible_text(h):
    h=re.sub(r'<script\b[^>]*>.*?</script>',' ',h,flags=re.S|re.I)
    h=re.sub(r'<style\b[^>]*>.*?</style>',' ',h,flags=re.S|re.I)
    t=re.sub(r'<[^>]+>',' ',h); t=ihtml.unescape(t); return re.sub(r'\s+',' ',t)
hits=collections.defaultdict(list)
for f in sorted(os.listdir(f'{BASE}/html')):
    if not f.endswith('.html'): continue
    u=f[:-5]
    raw=open(f'{BASE}/html/{f}',encoding='utf-8').read()
    vt=visible_text(raw)
    # JSON-LD raw (also a machine surface)
    ld=' '.join(re.findall(r'<script\b[^>]*ld\+json[^>]*>(.*?)</script>',raw,flags=re.S|re.I))
    for pat,tag in [(r'Festpreis','FESTPREIS-WORT'),(r'\bPaket\b','PAKET'),(r'\bTarif','TARIF'),(r'Honorar','HONORAR'),(r'kostenpflichtig','KOSTENPFLICHTIG'),(r'(?<![-\d])79[-–]149\s*€|79[.,]?\d*[-–]\s*149\s*€','PRICE-79-149'),(r'(29|49|79|99|149|199)\s*€','AMOUNT-EUR'),(r'"price"\s*:\s*"[^"]*"','JSONLD-PRICE'),(r'priceCurrency','JSONLD-CURRENCY'),(r'\bOffer\b','JSONLD-OFFER')]:
        for m in re.finditer(pat, vt+(' ||LD|| '+ld)):
            s=max(0,m.start()-90); e=min(len(vt+ld),m.end()+90)
            hits[tag].append((u, (vt+ld)[s:e].replace('\n',' ')))
print('\nprice-term categories:')
for k,v in hits.items():
    us=set(x[0] for x in v)
    print(f'  {k}: {len(v)} hits on {len(us)} pages -> {sorted(us)[:12]}')
json.dump({k:[ [u,c] for u,c in v] for k,v in hits.items()}, open(f'{BASE}/price_hits.json','w'), ensure_ascii=False, indent=1)
json.dump({'mirrored':mirrored,'de_only':sorted(de_only),'thin':thin,'h1':noh1,'nocanon':nocanon,'canon_mismatch':issues_can,'broken':broken,'hreflang404':t404,'no_hreflang':no_hl,'identical':ident}, open(f'{BASE}/aggregates.json','w'), ensure_ascii=False, indent=1)
print('saved aggregates.json + price_hits.json')
