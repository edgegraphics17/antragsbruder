#!/usr/bin/env python3
"""Crawler antragsbruder.de — stdlib only. Speichert Roh-HTML + Header + Parsergebnis.
Methodik RSC-Payload: unsichtbare Blöcke (<script>/<style>/<template>/<noscript>/<svg>/Kommentare)
werden per strip_invisible() entfernt, BEVOR H1/H2/Wortzahl/Bilder/Links gezählt werden.
Damit zählen wir nur echtes Markup, nicht self.__next_f.push()-Duplikate."""
import urllib.request, urllib.error, gzip, json, re, os, hashlib
from urllib.parse import urljoin, urlparse
from concurrent.futures import ThreadPoolExecutor

UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
RAW = '/Users/karim/audits/antragsbruder_2026-10-16/raw'
HTMLDIR = os.path.join(RAW, 'html')
HDRDIR = os.path.join(RAW, 'headers')
os.makedirs(HTMLDIR, exist_ok=True); os.makedirs(HDRDIR, exist_ok=True)

def fname(url):
    p = urlparse(url)
    s = p.path if p.path and p.path != '/' else '/root'
    s = re.sub(r'[^A-Za-z0-9._-]', '_', s)
    if p.query: s += '_' + hashlib.md5(p.query.encode()).hexdigest()[:6]
    return (s.lstrip('_') or 'root')

def fetch(url, max_redir=10):
    chain, cur, host = [], url, urlparse(url).netloc
    for _ in range(max_redir):
        req = urllib.request.Request(cur, headers={'User-Agent': UA,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8', 'Accept-Encoding': 'gzip'})
        body = None
        try:
            resp = urllib.request.urlopen(req, timeout=40)
            code, hdrs, body = resp.getcode(), dict(resp.headers), resp.read()
        except urllib.error.HTTPError as e:
            code, hdrs, body = e.code, dict(e.headers), e.read()
        except Exception as e:
            chain.append([cur, 'ERR:'+type(e).__name__, str(e)[:100]])
            return None, chain, {}, None
        if code in (301, 302, 303, 307, 308) and hdrs.get('Location'):
            chain.append([cur, code, hdrs.get('Location')])
            cur = urljoin(cur, hdrs['Location']); continue
        if hdrs.get('Content-Encoding') == 'gzip' or (body and body[:2] == b'\x1f\x8b'):
            try: body = gzip.decompress(body)
            except Exception: pass
        chain.append([cur, code, ''])
        return code, chain, hdrs, body
    return None, chain, {}, None

_INVIS = re.compile(r'<(script|style|noscript|template|svg)\b.*?</\1\s*>', re.S | re.I)
def strip_invisible(html):
    h = re.sub(r'<!--.*?-->', ' ', html, flags=re.S)
    prev = None
    while prev != h:
        prev = h
        h = _INVIS.sub(' ', h)
    return h

def attrs_of(tag):
    a = dict(re.findall(r'([a-zA-Z:_-]+)\s*=\s*"([^"]*)"', tag))
    a2 = dict(re.findall(r"([a-zA-Z:_-]+)\s*=\s*'([^']*)'", tag))
    for k, v in a2.items(): a.setdefault(k, v)
    return a

def analyze(url, html):
    m = re.search(r'<head\b.*?</head>', html, re.S | re.I)
    head = m.group(0) if m else html[:30000]
    vis = strip_invisible(html)
    d = {}
    for t in re.findall(r'<meta\b[^>]*>', head, re.I):
        a = attrs_of(t)
        k = (a.get('name') or a.get('property') or a.get('http-equiv') or '').lower()
        if k: d.setdefault(k, []).append(a.get('content', ''))
    links = [attrs_of(t) for t in re.findall(r'<link\b[^>]*>', head, re.I)]
    t = re.search(r'<title[^>]*>(.*?)</title>', head, re.S | re.I)
    title = re.sub(r'\s+', ' ', t.group(1)).strip() if t else None
    lang = re.search(r'<html[^>]*\blang=["\']([^"\']+)', html, re.I)
    texts = [re.sub(r'<[^>]+>', ' ', x) for x in re.findall(r'<h1\b[^>]*>(.*?)</h1>', vis, re.S | re.I)]
    imgs = [attrs_of(t) for t in re.findall(r'<img\b[^>]*>', vis, re.I)]
    anchors = re.findall(r'<a\b[^>]*?href=["\']([^"\']+)["\']', vis, re.I)
    txt = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', vis))
    words = len(re.findall(r'[A-Za-zÄÖÜäöüß0-9]{2,}[A-Za-zÄÖÜäöüß0-9.,/%-]*', txt))
    ld = re.findall(r'<script[^>]*?application/ld\+json[^>]*>(.*?)</script>', html, re.S | re.I)
    types, invalid = [], 0
    for j in ld:
        try: o = json.loads(j)
        except Exception: invalid += 1; continue
        def walk(x):
            if isinstance(x, dict):
                tt = x.get('@type')
                if tt: types.extend(tt if isinstance(tt, list) else [tt])
                for v in x.values(): walk(v)
            elif isinstance(x, list):
                for v in x: walk(v)
        walk(o)
    hreflang = [(l.get('hreflang'), l.get('href')) for l in links if l.get('rel') == 'alternate' and l.get('hreflang')]
    canon = [l.get('href') for l in links if l.get('rel') == 'canonical']
    og = {k: v for k, v in d.items() if k.startswith('og:') or k.startswith('twitter')}
    return dict(title=title, html_lang=(lang.group(1) if lang else None),
        desc=d.get('description', [None])[0], robots=d.get('robots', [None])[0],
        canonical=canon, hreflang=hreflang, og=og,
        h1=len(re.findall(r'<h1\b', vis, re.I)), h2=len(re.findall(r'<h2\b', vis, re.I)),
        h3=len(re.findall(r'<h3\b', vis, re.I)), h1texts=[re.sub(r'\s+', ' ', x).strip() for x in texts],
        words=words, n_img=len(imgs),
        img_noalt=sum(1 for i in imgs if not i.get('alt')),
        img_no_dims=sum(1 for i in imgs if not (i.get('width') and i.get('height'))),
        img_lazy=sum(1 for i in imgs if i.get('loading') == 'lazy'),
        anchors=anchors, jsonld_n=len(ld), jsonld_types=sorted(set(types)), jsonld_invalid=invalid,
        iframes=re.findall(r'<iframe\b[^>]*?src=["\']([^"\']+)', vis, re.I),
        render_blocking_css=len(re.findall(r'<link[^>]*rel=["\']stylesheet["\']', vis, re.I)) +
                          len(re.findall(r'<link[^>]*rel=["\']preload["\'][^>]*as=["\']style', vis, re.I)))

def crawl_one(url, save=True):
    code, chain, hdrs, body = fetch(url)
    rec = {'url': url, 'status': code, 'chain': chain}
    for hk, hv in hdrs.items():
        lk = hk.lower()
        if lk in ('x-robots-tag','content-type','x-vercel-cache','server','cache-control','location','content-security-policy','strict-transport-security','x-frame-options'):
            rec['hdr_' + lk] = hv
    if body is not None:
        html = body.decode('utf-8', 'replace')
        rec['bytes'] = len(body)
        if save:
            fn = fname(url)
            open(os.path.join(HTMLDIR, fn + '.html'), 'w', encoding='utf-8').write(html)
            json.dump(hdrs, open(os.path.join(HDRDIR, fn + '.hdr.json'), 'w'), indent=1)
        rec.update(analyze(url, html))
    else:
        rec['error'] = True
    return rec

def main():
    urls = [l.strip() for l in open(os.path.join(RAW, 'sitemap_urls.txt')) if l.strip()]
    extra = ['https://www.antragsbruder.de/alg1', 'https://www.antragsbruder.de/de',
      'https://www.antragsbruder.de/de/wohngeld', 'https://www.antragsbruder.de/en/wohngeld',
      'https://www.antragsbruder.de/en/bafoeg', 'https://www.antragsbruder.de/en/blog',
      'https://www.antragsbruder.de/tr/wohngeld', 'https://www.antragsbruder.de/ru/wohngeld',
      'https://www.antragsbruder.de/ar/wohngeld', 'https://www.antragsbruder.de/pl/wohngeld',
      'https://www.antragsbruder.de/en/wohngeld/rechner', 'https://www.antragsbruder.de/en/grundsicherungsrechner',
      'https://www.antragsbruder.de/gibt-es-nicht-404-test-xyz', 'https://www.antragsbruder.de/wohngeld/',
      'https://www.antragsbruder.de/api/health', 'https://www.antragsbruder.de/admin',
      'https://www.antragsbruder.de/dashboard', 'https://www.antragsbruder.de/anmelden',
      'https://www.antragsbruder.de/konto-erstellen', 'https://www.antragsbruder.de/teilen/test',
      'https://www.antragsbruder.de/preise', 'https://www.antragsbruder.de/en/preise']
    all_urls = urls + [u for u in extra if u not in urls]
    recs = []
    with ThreadPoolExecutor(max_workers=6) as ex:
        for r in ex.map(crawl_one, all_urls):
            recs.append(r)
            print('OK' if r.get('status') else 'FAIL', r.get('status'), r['url'], flush=True)
    probes = ['http://antragsbruder.de/', 'http://www.antragsbruder.de/', 'https://antragsbruder.de/',
              'http://antragsbruder.de/wohngeld', 'https://www.antragsbruder.de/humans.txt',
              'https://www.antragsbruder.de/llms.txt', 'https://www.antragsbruder.de/sitemap_index.xml',
              'https://www.antragsbruder.de/robots.txt']
    prem = []
    for u in probes:
        code, chain, hdrs, body = fetch(u)
        prem.append({'url': u, 'status': code, 'chain': chain, 'headers': hdrs,
                     'bytes': len(body) if body else 0})
        print('PROBE', code, u, '->', ' | '.join(f'{c[1]}:{c[0]}' for c in chain), flush=True)
    json.dump(recs, open(os.path.join(RAW, 'crawl.json'), 'w'), ensure_ascii=False, indent=1)
    json.dump(prem, open(os.path.join(RAW, 'probes_redirects.json'), 'w'), ensure_ascii=False, indent=1)
    print('DONE', len(recs), 'crawled,', len(prem), 'probes')

if __name__ == '__main__':
    main()
