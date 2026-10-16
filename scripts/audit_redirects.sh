#!/usr/bin/env bash
# Single-hop redirect probe for every sitemap URL (status + Location), no auto-follow.
cd /Users/karim/Claude/Projects/Antragsbruder
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
mkdir -p raw
: > raw/redirects.tsv
while read -r url; do
  out=$(curl -sS -A "$UA" -o /dev/null -w '%{http_code}\t%{redirect_url}' --max-time 25 "$url" || echo "ERR\t")
  printf '%s\t%s\n' "$url" "$out" >> raw/redirects.tsv
done < raw/sitemap_all_urls.txt
