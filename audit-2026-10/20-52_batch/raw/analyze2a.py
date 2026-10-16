#!/usr/bin/env python3
"""Master-Analyse: Linkgraph, Dupes, hreflang-Kategorien, JSON-LD Offer, Preis-Scan, Locale, CSV."""
import json, os, re, csv, collections, hashlib
from urllib.parse import urljoin, urlparse, unquote, quote
RAW='/Users/karim/audits/antragsbruder_2026-10-16/raw'
BASE='https://www.antragsbruder.de'
HOST='www.antragsbruder.de'
recs=json.load(open(f'{RAW}/crawl.json'))+json.load(open(f'{RAW}/crawl2.json'))
sitemap=[l.strip() for l in open(f'{RAW}/sitemap_urls.txt')]
xml=open(f'{RAW}/sitemap.xml').read()
blocks={}
for b in re.findall(r'<url>(.*?)</url>', xml, re.S):
    loc=re.search(r'<loc>(.*?)</loc>',b).group(1)
    blocks[loc]=dict(re.findall(r'hreflang="([^"]+)" href="([^"]+)"', b))
by={}
for r in recs:
    key=unquote(r.get('original_url') or r['url'])
    by[key]=r
def status(u):
    u=unquote(u)
    return by.get(u,{}).get('status')

def normpath(u):
    p=urlparse(u if u.startswith('http') else BASE+u)
    return unquote(p.path) or '/'

out=open(f'{RAW}/analysis2.txt','w')
def P(*a):
    s=' '.join(str(x) for x in a); print(s); out.write(s+'\n')

ok=[r for r in recs if r['status']==200 and r.get('title') is not None]
P('== MASTER =='); P('records:',len(recs),'| 200:',len([r for r in recs if r['status']==200]),'| 404:',len([r for r in recs if r['status']==404]),'| ERR:',len([r for r in recs if r.get('status') is None]))
P('im Sitemap gelistet:',len(sitemap),'| gecrawlt aber NICHT in Sitemap:',len([r for r in recs if unquote(r['url']) not in sitemap and r['status']==200 and 'probe' not in r['url']]))
not_in_sm=sorted({unquote(r['url']) for r in recs if r['status']==200 and unquote(r['url']) not in sitemap})
P('  davon /datenbank/ Details:',len([u for u in not_in_sm if '/datenbank/' in u]),'| /blog:',[u for u in not_in_sm if '/blog' in u])
P('  andere:',[u for u in not_in_sm if '/datenbank/' not in u and '/blog' not in u])

P('\n== LINKGRAPH / BROKEN INTERNAL LINKS ==')
inbound=collections.Counter(); external=collections.Counter()
for r in ok:
    for h in (r.get('anchors') or []):
        if h.startswith('#') or h.lower().startswith(('mailto','tel','javascript','data')): continue
        u=urljoin(BASE+h if h.startswith('/') else unquote(r['url']), h)
        p=urlparse(u)
        if p.netloc!=HOST: external[p.netloc]+=1; continue
        key=unquote(p.path).rstrip('/') or '/'
        inbound[key]+=1
P('Broken interne Links (Ziel liefert 404):')
bl={}
for r in ok:
    for h in (r.get('anchors') or []):
        if h.lower().startswith(('http','/')) and not h.lower().startswith(('mailto','tel','javascript')):
            u=urljoin(BASE+h if h.startswith('/') else unquote(r['url']), h)
            p=urlparse(u)
            if p.netloc!=HOST: continue
            if status(unquote(u))==404:
                bl.setdefault(unquote(u),set()).add(unquote(r['url']))
for u,s in sorted(bl.items()):
    P('  404:',u,'<- verlinkt von:',sorted(s)[:6],'(' ,len(s),'Seiten )')
P('Externe Linkziele:',dict(external.most_common(15)))
orph=[unquote(r['url']) for r in ok if inbound.get(normpath(r['url']).rstrip('/') or '/',0)==0]
P('Seiten ohne eingehende interne Links (Orphans):',len(orph))
for u in orph: P('   ',u)

P('\n== DUPLIKAT-GRUPPEN (gleiches Title+Desc, beide 200) ==')
groups=collections.defaultdict(list)
for r in ok:
    groups[(r['title'],r.get('desc'))].append(unquote(r['url']))
n=0
for (t,d),us in groups.items():
    if len(us)>1 and t:
        n+=1; P(' x%d: %s'%(len(us),t[:90])); P('      ',us[:8])
P('Gruppen gesamt:',n)

P('\n== JSON-LD OFFER (Preis-Strukturierte-Daten!) ==')
import urllib.request
from crawler import fname
# Offer-Details aus gespeicherten HTMLs ziehen
def jsonld_blocks(path):
    html=open(path,encoding='utf-8').read()
    return re.findall(r'<script[^>]*?application/ld\+json[^>]*>(.*?)</script>', html, re.S|re.I)
offers=[]
for r in ok:
    fp=f"{RAW}/html/{fname(unquote(r['url']))}.html"
    if not os.path.exists(fp): continue
    for j in jsonld_blocks(fp):
        try: o=json.loads(j)
        except Exception: continue
        stack=[o]
        while stack:
            x=stack.pop()
            if isinstance(x,dict):
                if x.get('@type')=='Offer':
                    offers.append({'page':unquote(r['url']),'name':x.get('name'),'price':x.get('price'),'priceCurrency':x.get('priceCurrency'),'description':(x.get('description') or '')[:120],'@id':x.get('@id')})
                stack.extend(x.values())
            elif isinstance(x,list): stack.extend(x)
json.dump(offers, open(f'{RAW}/offer_ld.json','w'), ensure_ascii=False, indent=1)
P('Offer-Entitäten gesamt:',len(offers))
seen=collections.Counter((str(o['name']),str(o['price']),str(o['priceCurrency'])) for o in offers)
for k,c in seen.most_common(30): P('  x%d'%c, k)
P('Seiten mit Offer:',sorted({o['page'] for o in offers})[:40])
