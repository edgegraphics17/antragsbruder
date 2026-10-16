#!/usr/bin/env python3
"""Analyze crawled HTML: per-URL SEO metrics -> raw/urls.csv + raw/analysis.json.
Important: strip <script> (Next.js RSC flight payload duplicates everything) before DOM counting."""
import os, re, json, glob, html as ihtml, hashlib, collections

BASE = '/Users/karim/Claude/Projects/Antragsbruder/raw'
HOST = 'https://www.antragsbruder.de'

def strip_scripts(h):
    h = re.sub(r'<script\b[^>]*>.*?</script>', ' ', h, flags=re.S | re.I)
    h = re.sub(r'<style\b[^>]*>.*?</style>', ' ', h, flags=re.S | re.I)
    h = re.sub(r'<!--.*?-->', ' ', h, flags=re.S)
    return h

def get_title(h):
    m = re.search(r'<title[^>]*>(.*?)</title>', h, re.S | re.I)
    return ihtml.unescape(m.group(1)).strip() if m else ''

def meta(h, name):
    for m in re.finditer(r'<meta\b([^>]*?)/?>', h, re.I):
        a = m.group(1)
        k = 'property' if name.startswith(('og:', 'twitter:image')) and re.search(r'property=', a) else None
        pat = rf'{k or "name"}\s*=\s*"{re.escape(name)}"'
        if re.search(pat, a, re.I):
            c = re.search(r'content\s*=\s*"([^"]*)"', a, re.I)
            return ihtml.unescape(c.group(1)).strip() if c else ''
    # fallback: check either attr
    m = re.search(rf'<meta\b[^>]+(?:name|property)\s*=\s*"{re.escape(name)}"[^>]*content\s*=\s*"([^"]*)"', h, re.I)
    if m: return ihtml.unescape(m.group(1)).strip()
    m = re.search(rf'<meta\b[^>]+content\s*=\s*"([^"]*)"[^>]*(?:name|property)\s*=\s*"{re.escape(name)}"', h, re.I)
    return ihtml.unescape(m.group(1)).strip() if m else ''

def links_rel(h, rel):
    out = []
    for m in re.finditer(r'<link\b([^>]*?)/?>', h, re.I):
        a = m.group(1)
        if re.search(rf'rel\s*=\s*"{rel}"', a, re.I):
            href = re.search(r'href\s*=\s*"([^"]*)"', a, re.I)
            hreflang = re.search(r'hreflang\s*=\s*"([^"]*)"', a, re.I)
            out.append((hreflang.group(1) if hreflang else '', href.group(1) if href else ''))
    return out

def wordcount(body):
    t = re.sub(r'<[^>]+>', ' ', body)
    t = ihtml.unescape(t)
    t = re.sub(r'\s+', ' ', t)
    words = re.findall(r'\S+', t)
    return len(words)

rows = []
all_internal = collections.defaultdict(set)   # normalized target -> set of source urls
jsonld_all = {}
for f in sorted(glob.glob(f'{BASE}/html/*.html')):
    s = os.path.basename(f)[:-5]
    m = json.load(open(f'{BASE}/meta/{s}.json'))
    raw = open(f, encoding='utf-8').read()
    d = {'slug': s, 'url': m['url'], 'status': m['status'],
         'redirect_chain': ' | '.join(f'{c}:{st}' for c, st in m['redirect_chain']),
         'hops': len(m['redirect_chain']) - 1}
    # JSON-LD from scripts BEFORE stripping
    types = []
    for mm in re.finditer(r'<script\b[^>]*application/ld\+json[^>]*>(.*?)</script>', raw, re.S | re.I):
        try:
            j = json.loads(mm.group(1))
            items = j if isinstance(j, list) else [j]
            for it in items:
                t = it.get('@type', '')
                types.append(t if isinstance(t, str) else ','.join(t))
                def walk(o):
                    if isinstance(o, dict):
                        if '@type' in o and isinstance(o['@type'], str): types.append(o['@type'])
                        for v in o.values(): walk(v)
                    elif isinstance(o, list):
                        for v in o: walk(v)
                walk(it)
        except Exception:
            types.append('PARSE_ERROR')
    d['jsonld_types'] = ';'.join(sorted(set(types)))
    body = strip_scripts(raw)
    d['title'] = get_title(raw)
    d['description'] = meta(raw, 'description')
    d['robots'] = meta(raw, 'robots')
    d['canonical'] = ';'.join(h for _, h in links_rel(raw, 'canonical'))
    hrefs = links_rel(raw, 'alternate')
    d['hreflang'] = ';'.join(f'{hl}={h}' for hl, h in hrefs)
    d['og_title'] = meta(raw, 'og:title'); d['og_desc'] = meta(raw, 'og:description')
    d['og_image'] = meta(raw, 'og:image'); d['tw_card'] = meta(raw, 'twitter:card')
    d['h1'] = len(re.findall(r'<h1\b', body, re.I))
    d['h2'] = len(re.findall(r'<h2\b', body, re.I))
    d['words'] = wordcount(body)
    d['html_lang'] = (re.search(r'<html[^>]*\blang\s*=\s*"([^"]*)"', raw, re.I) or [None, ''])[1] if re.search(r'<html[^>]*\blang\s*=\s*"([^"]*)"', raw, re.I) else ''
    d['dir_rtl'] = bool(re.search(r'<html[^>]*dir\s*=\s*"rtl"', raw, re.I))
    # internal links (outside scripts)
    internal = set()
    for mm in re.finditer(r'<a\b[^>]*href\s*=\s*"([^"]+)"', body, re.I):
        h = mm.group(1)
        if h.startswith('/'):
            p = h.split('#')[0].split('?')[0]
            p = HOST + (p if p != '/' else '/')
            internal.add(p)
        elif h.startswith(HOST):
            p = re.sub(r'[?#].*$', '', h)
            internal.add(p)
    d['internal_links'] = len(internal)
    d['internal_targets'] = ' '.join(sorted(internal))
    for t in internal:
        all_internal[t].add(m['url'])
    imgs = re.findall(r'<img\b([^>]*?)/?>', body, re.I)
    d['imgs'] = len(imgs)
    d['imgs_no_alt'] = sum(1 for a in imgs if not re.search(r'\balt\s*=', a, re.I))
    d['imgs_alt_empty'] = sum(1 for a in imgs if re.search(r'\balt\s*=\s*""', a, re.I))
    # visible text hash for duplicate detection
    vt = re.sub(r'<[^>]+>', ' ', body); vt = ihtml.unescape(vt); vt = re.sub(r'\s+', ' ', vt).strip()
    d['text_hash'] = hashlib.md5(vt[:15000].encode()).hexdigest()
    rows.append(d)

import csv
cols = list(rows[0].keys())
with open(f'{BASE}/urls.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=cols); w.writeheader(); w.writerows(rows)
json.dump({'rows': rows, 'internal': {k: sorted(v) for k, v in all_internal.items()}},
          open(f'{BASE}/analysis.json', 'w'), ensure_ascii=False)
print('rows:', len(rows), '-> raw/urls.csv')

# quick aggregates
by_title = collections.defaultdict(list)
by_desc = collections.defaultdict(list)
for r in rows:
    if r['status'] == 200:
        by_title[r['title']].append(r['url'])
        by_desc[r['description']].append(r['url'])
print('dup titles:', {k: v for k, v in by_title.items() if len(v) > 1 and k})
print('dup descs:', {k: len(v) for k, v in by_desc.items() if len(v) > 1 and k})
