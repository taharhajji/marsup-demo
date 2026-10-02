#!/usr/bin/env sh
# Assemble les parties en deux sorties :
#  - artifact.html : corps seul (publication Claude Artifact)
#  - index.html    : page autonome (GitHub / Vercel)
cd "$(dirname "$0")"
cat src/p1_head.html src/p2_site.html src/p3_data.js src/p4a_app.js src/p4b_app.js src/p5_admin.js > artifact.html
{
  printf '%s\n' '<!doctype html>' '<html lang="fr">' '<head>' \
  '<meta charset="utf-8">' \
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' \
  '<meta name="theme-color" content="#0F6BFF">' \
  '<meta name="description" content="mars’up : bouge, rencontre, vis Marseille autrement. Démo interactive de l’application sportive et sociale.">' \
  '<meta name="apple-mobile-web-app-capable" content="yes">' \
  '<meta name="apple-mobile-web-app-status-bar-style" content="default">' \
  '<meta property="og:title" content="mars’up — Bouge. Rencontre. Vis Marseille autrement.">' \
  '<meta property="og:description" content="Trouve ton activité, ton groupe et les personnes qui te correspondent à Marseille.">' \
  '<meta property="og:image" content="/logo-full.png">' \
  '<link rel="icon" type="image/png" href="/logo-mark.png">' \
  '<link rel="apple-touch-icon" href="/logo-mark.png">' \
  '<style>:root{color-scheme:light}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>' \
  '</head>' '<body>'
  cat artifact.html
  printf '%s\n' '</body>' '</html>'
} > index.html
echo "build: artifact.html ($(wc -c < artifact.html) o) · index.html ($(wc -c < index.html) o)"
