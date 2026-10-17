# YoShezzy — official site

Next.js 15 (App Router) + GSAP 3.13 (ScrollTrigger, SplitText) + Lenis smooth scroll.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Requires Node 18.18+ (Node 20 or 22 recommended).

## Put it on GitHub

```bash
cd yoshezzy
git init
git add .
git commit -m "YoShezzy site"
git branch -M main
git remote add origin https://github.com/<your-username>/yoshezzy.git
git push -u origin main
```

(Create the empty `yoshezzy` repo on github.com first — no README, no .gitignore.)

## Deploy on Vercel

1. vercel.com → **Add New… → Project** → import the GitHub repo.
2. Framework preset is detected as **Next.js**. Leave build settings as they are.
3. Click **Deploy**. Every push to `main` redeploys automatically.
4. Add your custom domain under **Settings → Domains**, then set `site.url` in `lib/data.ts`.

Fonts are self-hosted (Fontsource), so the build needs no external font requests.

## What's on the page

| Section | Motion |
| --- | --- |
| Preloader | "Watkine, Booooi!" letter reveal + 000→100 counter, panel wipes up |
| Hero | Giant split-letter title, a Durban sun that **sets as you scroll**, ocean wave lines drawing in, rotating role word |
| Marquees | Infinite tickers that speed up and flip direction with scroll velocity |
| Story | Paragraph lights up word-by-word as you scroll |
| Roots | Pinned **horizontal scroll** through five chapters (Town → Sydenham → Overport → Wyebank → Durban) with parallax suburb names; stacks vertically on mobile |
| Numbers | Count-up stats |
| What he does | Hover list with a floating image card that follows the cursor and tilts with speed |
| Services | Sticky stacking cards that scale back as the next one arrives |
| Shez Apparel | Scroll-rotating badge, clip-path reveal |
| Press | Independent on Saturday feature |
| Socials | Magnetic arrows, fill-on-hover rows |
| Contact | Booking brief form (opens the visitor's email app, prefilled) |
| Footer | Giant SHEZZY letters rise as you reach the bottom |

Custom cursor on desktop only. Everything respects `prefers-reduced-motion`.

## Before launch — checklist

1. **Photos.** Put images in `public/images/` and set the paths in `lib/data.ts → images`
   (until then each slot shows a branded sunset placeholder). Hero works best as a 3:4 portrait.
2. **Numbers.** Update `stats` in `lib/data.ts` — follower counts move fast.
3. **Domain.** Set `site.url` in `lib/data.ts` (used for SEO metadata).
4. **Get Shezzy / his team to sign off** on the bio copy and services list.
5. **Form.** The contact form uses `mailto:` (no backend). For proper lead capture, swap
   `submit()` in `components/Contact.tsx` for Formspree, Resend or a Next.js route handler.
6. Optional: add an OG image at `app/opengraph-image.jpg` (1200×630).

All copy lives in `lib/data.ts`.

## Sources used for the copy
- Independent on Saturday / IOL profile, 30 June 2025 — "How 'Yo Shezzy' became Durban's viral phenom"
- Public bios: Instagram @yoshezzy, TikTok @yoshezzzy, YouTube "YoShezzy"
