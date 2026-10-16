#!/usr/bin/env python3
"""Analyse crawl.json -> Statistik, Duplikate, hreflang-Korrektheit, Orphans, kaputte Links."""
import json, re, collections, os
from urllib.parse import urljoin, urlparse
RAW='/Users/karim/audits/antragsbruder_2026-10-16/raw'
BASE='https://www.antragsbruder.de'
recs=json.load(open(os.path.join(RAW,'crawl.json')))
sitemap=[l.strip() for l in open(os.path.join(RAW,'sitemap_urls.txt'))]
by={r['url']:r for r in recs}

print('== STATUS ==')
sc=collections.Counter(str(r['status']) for r in recs)
print(dict(sc))
print('\n== 404-URLS ==')
for r in recs:
    if r['status']==404: print(' ', r['url'], 'in-sitemap' if r['url'] in sitemap else 'probe')

print('\n== REDIRECT-KETTEN (interesting) ==')
for r in recs:
    ch=[c for c in r['chain'] if c[1] not in ('',None)]
    if any(str(c[1]).startswith('3') for c in r['chain'] if isinstance(c[1],int)):
        print(' ', r['url'], '->', ' | '.join(f"{c[1]} {c[2] or c[0]}" for c in r['chain']))

print('\n== TITLES/DESCS DUPES (200er) ==')
ok=[r for r in recs if r['status']==200]
tc=collections.Counter((r.get('title') or 'NO-TITLE') for r in ok)
for t,c in tc.most_common(12):
    if c>1: print(f' x{c}: {t[:110]}')
    urls=[r['url'] for r in ok if (r.get('title') or 'NO-TITLE')==t]
    if c>1: print('    ', urls[:12])
dc=collections.Counter((r.get('desc') or 'NO-DESC') for r in ok)
nd=[r['url'] for r in ok if not r.get('desc')]
print('missing desc:', len(nd), nd[:15])
for t,c in dc.most_common(8):
    if c>1: print(f' desc x{c}: {str(t)[:100]}')

print('\n== CANONICAL ==')
for r in ok:
    canon=r.get('canonical') or []
    exp=r['url']
    if not canon: print(' NO-CANONICAL:', r['url'])
    else:
        c0=canon[0]
        if not c0.startswith('http'): c0=urljoin(BASE, c0)
        if c0.rstrip('/')!=exp.rstrip('/'): print(f' CANON≠SELF: {exp} -> {c0}')

print('\n== HREFLANG (page head) ==')
def norm(u):
    u=u or ''
    if not u.startswith('http'): u=urljoin(BASE,u)
    return u
for r in ok[:0]: pass
issues=0
for r in ok:
    hl=dict(r.get('hreflang') or [])
    canon=(r.get('canonical') or [r['url']])[0]
    missing_self = r['url'] not in [norm(v) for v in hl.values()]
    if hl and missing_self:
        issues+=1
        if issues<=12: print(f' NO-SELF-HREFLANG: {r["url"]} (n={len(hl)})')
    if not hl:
        if r['url'] in [BASE+'/']: pass
nohl=[r['url'] for r in ok if not (r.get('hreflang') or [])]
print(' pages without hreflang:', len(nohl), nohl[:10])

print('\n== SITEMAP-HREFLANG vs REALITÄT ==')
xml=open(os.path.join(RAW,'sitemap.xml')).read()
blocks=dict()
for b in re.findall(r'<url>(.*?)</url>', xml, re.S):
    loc=re.search(r'<loc>(.*?)</loc>',b).group(1)
    alts=re.findall(r'hreflang="([^"]+)" href="([^"]+)"', b)
    blocks[loc]=dict(alts)
bad=[]
for loc,alts in blocks.items():
    for h,u in alts.items():
        if u in by and by[u]['status']==404:
            bad.append((loc,u))
print(' sitemap hreflang targets that 404:', len(bad))
for x in bad[:15]: print('  ', x)

print('\n== H1 ==')
for r in ok:
    if r.get('h1',0)==0: print(' NO-H1:', r['url'], 'words:', r.get('words'))
    if r.get('h1',0)>1: print(' MULTI-H1 (%d):'%r['h1'], r['url'])

print('\n== THIN (<300 words) ==')
for r in sorted(ok,key=lambda x:x.get('words',0)):
    if r.get('words',0)<300: print(f'  {r["words"]:5d}  {r["url"]}')

print('\n== ROBOTS-META / X-ROBOTS ==')
for r in ok:
    if r.get('robots') or r.get('hdr_x-robots-tag'):
        print(f'  {r["url"]}  meta={r.get("robots")}  hdr={r.get("hdr_x-robots-tag")}')

print('\n== JSON-LD ==')
jt=collections.Counter()
for r in ok:
    for t in r.get('jsonld_types',[]): jt[t]+=1
print(dict(jt.most_common(25)))
for r in ok:
    if r.get('jsonld_invalid'): print(' INVALID JSON-LD:', r['url'])
    if not r.get('jsonld_n'): print(' NO JSON-LD:', r['url'])

print('\n== IMAGES ==')
for r in ok:
    if r.get('img_noalt',0)>0: print(f'  alt-fehlend {r["img_noalt"]}/{r["n_img"]}: {r["url"]}')

print('\n== INTERNE LINKS: orphan-check + new targets ==')
inbound=collections.Counter()
new_targets=set()
for r in ok:
    for h in (r.get('anchors') or []):
        if h.startswith('#') or h.startswith('mailto') or h.startswith('tel') or h.startswith('javascript'): continue
        u=urljoin(BASE,h)
        p=urlparse(u)
        if p.netloc!=urlparse(BASE).netloc: continue
        path=p.path or '/'
        path=re.sub(r'/+','/',path)
        # locale-prefix normalize: map to absolute path incl locale
        tgt=BASE+path+('?'+p.query if p.query else '')
        if path.lower()!=path: tgt=BASE+path
        if tgt in by: continue
        new_targets.add(tgt)
        inbound[tgt]+=1
print(' discovered-not-crawled (unique):', len(new_targets))
open(os.path.join(RAW,'new_targets.txt'),'w').write('\n'.join(sorted(new_targets))+'\n')
import itertools
for x in itertools.islice(sorted(new_targets),80): print('  +',x)
