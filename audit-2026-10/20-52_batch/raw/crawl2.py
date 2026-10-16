#!/usr/bin/env python3
"""Crawle neu entdeckte interne Linkziele (2. Welle) -> crawl2.json."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from crawler import crawl_one
RAW='/Users/karim/audits/antragsbruder_2026-10-16/raw'
targets=[l.strip() for l in open(os.path.join(RAW,'new_targets.txt')) if l.strip()]
# Query-Varianten zusammenfalten: nur je Pfad+erstem Parameterwert 1 URL behalten? Nein: alle, das sind potentielle Dupes. Aber Limit 260.
from concurrent.futures import ThreadPoolExecutor
recs=[]
with ThreadPoolExecutor(max_workers=6) as ex:
    for r in ex.map(lambda u: crawl_one(u), targets):
        recs.append(r)
json.dump(recs, open(os.path.join(RAW,'crawl2.json'),'w'), ensure_ascii=False, indent=1)
import collections
print(collections.Counter(str(r['status']) for r in recs))
for r in recs:
    if r['status']!=200: print(r['status'], r['url'])
