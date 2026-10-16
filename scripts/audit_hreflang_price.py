#!/usr/bin/env python3
import json, re, os, collections, urllib.request, ssl, concurrent.futures as cf
BASE='/Users/karim/Claude/Projects/Antragsbruder/raw'
HOST='https://www.antragsbruder.de'
d=json.load(open(f'{BASE}/analysis.json'))
rows=d['rows']
known={r['url']:r['status'] for r in rows}

# collect all hreflang targets
targets=set()
per_page={}
for r in rows:
    hl=dict()
    for part in [x for x in r['hreflang'].split(';') if x]:
        k,v=part.split('=',1)
        if not v.startswith('http'): v=HOST+v
        hl[k]=v; targets.add(v)
    per_page[r['url']]=hl
targets=sorted(t for t in targets if t.rstrip('/') not in [k.rstrip('/') for k in known])
print('hreflang targets NOT already crawled:',len(targets))
def probe(u):
    try:
        req=urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'})
        with urllib.request.urlopen(req,timeout=25) as r: return u,r.status
    except urllib.error.HTTPError as e: return u,e.code
    except Exception as e: return u,'ERR'
with cf.ThreadPoolExecutor(max_workers=8) as ex:
    res=dict(ex.map(probe,targets))
json.dump(res,open(f'{BASE}/hreflang_target_probe.json','w'),indent=1)
bad=collections.Counter()
badlist=collections.defaultdict(list)
allstatus={**{k.rstrip('/'):v for k,v in known.items()},**{k.rstrip('/'):v for k,v in res.items()}}
for page,hl in per_page.items():
    if known.get(page,200)!=200: continue
    for k,v in hl.items():
        st=allstatus.get(v.rstrip('/'), '?')
        if st!=200:
            bad[page.split('.de')[-1]]+=1
            badlist[page].append((k,v,st))
print('\npages with >=1 non-200 hreflang target:',len(bad))
for p,c in sorted(bad.items(), key=lambda x:-x[1])[:25]: print(f'  {p}: {c} bad targets')
n_targets=sum(bad.values())
print('total dangling hreflang references (200-pages):',n_targets)
json.dump({p:[[k,v,str(s)] for k,v,s in v] for p,v in badlist.items()},open(f'{BASE}/hreflang_dangling.json','w'),indent=1)

# JSON-LD Offer prices on calculator pages
print('\n=== JSON-LD Offer/price on de calculator pages ===')
for slug in ['wohngeld_rechner','bafoegrechner','grundsicherungsrechner','wohngeld','en_bafoegrechner','wohngeld_antrag','en_wohngeld_rechner']:
    f=f'{BASE}/html/{slug}.html'
    if not os.path.exists(f): continue
    raw=open(f,encoding='utf-8').read()
    for m in re.finditer(r'<script\b[^>]*ld\+json[^>]*>(.*?)</script>',raw,re.S|re.I):
        try: j=json.loads(m.group(1))
        except Exception: continue
        items=j.get('@graph',[j]) if isinstance(j,dict) else (j if isinstance(j,list) else [])
        def find(o):
            out=[]
            if isinstance(o,dict):
                if o.get('@type')=='Offer' or 'price' in o or 'offers' in o:
                    out.append({k:o[k] for k in ('@type','name','price','priceCurrency','priceSpecification','@id') if k in o})
                for v in o.values(): out+=find(v)
            elif isinstance(o,list):
                for v in o: out+=find(v)
            return out
        for o in find(items): print(f'{slug}:',json.dumps(o,ensure_ascii=False)[:300])
