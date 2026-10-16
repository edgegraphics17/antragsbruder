#!/usr/bin/env python3
"""Crawl all sitemap URLs of www.antragsbruder.de, save raw HTML+headers, extract metrics."""
import os, re, sys, json, time, gzip, io, urllib.request, urllib.error, ssl
from concurrent.futures import ThreadPoolExecutor

BASE = '/Users/karim/Claude/Projects/Antragsbruder/raw'
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
urls = [u.strip() for u in open(f'{BASE}/sitemap_all_urls.txt') if u.strip()]
os.makedirs(f'{BASE}/html', exist_ok=True)
os.makedirs(f'{BASE}/meta', exist_ok=True)

def slug(u):
    p = u.replace('https://www.antragsbruder.de', '') or '/'
    p = p.strip('/') or 'home'
    return re.sub(r'[^a-zA-Z0-9._-]', '_', p) or 'home'

def fetch(u):
    ctx = ssl.create_default_context()
    chain = []
    cur = u
    for _ in range(6):
        req = urllib.request.Request(cur, headers={'User-Agent': UA, 'Accept': 'text/html,*/*', 'Accept-Encoding': 'gzip'})
        try:
            with urllib.request.urlopen(req, timeout=40, context=ctx) as r:
                status = r.status
                raw = r.read()
                if r.headers.get('Content-Encoding', '').lower() == 'gzip' or raw[:2] == b'\x1f\x8b':
                    try: raw = gzip.decompress(raw)
                    except Exception: pass
                html = raw.decode('utf-8', 'replace')
                hdrs = dict(r.headers)
                final = r.geturl()
                chain.append((cur, status))
                if status in (301, 302, 303, 307, 308):
                    loc = hdrs.get('Location', '')
                    if not loc: break
                    if loc.startswith('/'): loc = 'https://www.antragsbruder.de' + loc
                    if loc == cur: break
                    cur = loc
                    if len(chain) >= 6: break
                    continue
                break
        except urllib.error.HTTPError as e:
            raw = e.read() if hasattr(e, 'read') else b''
            try:
                if raw[:2] == b'\x1f\x8b': raw = gzip.decompress(raw)
            except Exception: pass
            html = raw.decode('utf-8', 'replace')
            hdrs = dict(e.headers) if e.headers else {}
            status = e.code
            final = cur
            chain.append((cur, status))
            break
        except Exception as e:
            return {'url': u, 'error': str(e)}
    s = slug(u)
    with open(f'{BASE}/html/{s}.html', 'w', encoding='utf-8') as f:
        f.write(html)
    meta = {'url': u, 'slug': s, 'status': status, 'final_url': final,
            'redirect_chain': chain, 'headers': hdrs, 'bytes': len(html)}
    with open(f'{BASE}/meta/{s}.json', 'w', encoding='utf-8') as f:
        json.dump(meta, f)
    return meta

t0 = time.time()
with ThreadPoolExecutor(max_workers=6) as ex:
    results = list(ex.map(fetch, urls))
print(f'fetched {len(results)} urls in {time.time()-t0:.0f}s')
errs = [r for r in results if 'error' in r]
print('errors:', errs[:5])
by_status = {}
for r in results:
    by_status[r.get('status')] = by_status.get(r.get('status'), 0) + 1
print('status counts:', by_status)
