# Vignesh M — Portfolio (Static HTML/CSS/JS)

A fully static export of the portfolio. No build tools, no dependencies.

## Files
- index.html — homepage
- projects/*.html — case study pages
- styles.css — all styling (design tokens, layout, typography)
- script.js — small JS (year, nav shadow, contact form)

## Run locally
Just open index.html in a browser. For clean routing serve with any static server:

    python3 -m http.server 8000
    # then visit http://localhost:8000

## Deploy
Drop the folder into Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any static host.
