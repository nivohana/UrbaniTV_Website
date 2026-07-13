<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Urbani.tv — marketing site

Dark, premium CTV-adtech marketing site for Urbani. Next.js App Router + Tailwind v4 + framer-motion. Positioning (client-directed, modeled on se7en.es/Galileo): the whole site centers on the **Urbani™** agent (always exactly "Urbani™" — the client renamed it from "Urbani Agent™" on 2026-07-11; never write "Urbani Agent". ™ on wordmark moments and copy mentions of the agent) — the AI brain behind the company that reads every bid request and decides in milliseconds: the right ad, in the right home, at the right moment. Advertiser benefits first — "get more from your media spend"; don't revert to performance-only messaging. All copy is CTV-only by client request — do not reintroduce display/web/in-app/mobile channel claims (no "omnichannel", no "every screen").

Design language (client-directed, copied deliberately from se7en.es): giant typographic wordmark moments (`text-gradient` "Urbani™" in the hero, full-screen "Introducing Urbani™" — but NOT in the footer; the client removed the se7en-style footer wordmark as UI-breaking), full-bleed edge-to-edge photography with short overlaid copy, huge scrolling marquee text behind floating tilted photo cards, floating `aria-hidden` stat chips over photos (the client explicitly loves this motif — reuse it), big editorial numbered rows with hairline dividers. Keep copy minimal: one short line + tight bullets, never title-plus-long-paragraph blocks. Avoid boxed "glass card" grids; the client rejected that look. **`Engine.tsx` is client-approved as-is — do not restyle it without direction.**

## Structure
- `src/app/page.tsx` — homepage, assembles the section components in order.
- `src/app/(legal)/privacy`, `(legal)/terms` — placeholder legal pages (replace with counsel-approved copy before launch).
- `src/components/` — one file per homepage section, in page order: Hero (full-bleed film image + giant Urbani™ wordmark + BidstreamCanvas overlay), Introducing (full-screen Urbani™ agent wordmark reveal, `#agent`), Engine (`#technology`), AudienceRows (two full-bleed cinematic panels, `#advertisers`/`#publishers`), LogoStrip, MarqueeReel (giant scrolling echo text behind a tilted stadium card with stat chips), Flow (editorial numbered rows, `#flow`), FinalCTA (`#contact`), Footer — plus `ui/` primitives (Reveal scroll-reveal, Counter animated count-up, SectionHeading).
- `public/images/` — cinematic photography from Unsplash (Unsplash License, free commercial use, no attribution required): hero-film (curled 35mm film strip, darkened in-component with an overlay wash), audience, seats, stadium, projector, brand-creative (beauty-model portrait used in `Engine.tsx` as a sample brand campaign creative). Replace with brand photography when available; keep imagery dark/cinematic and trademark-free.
- `Engine.tsx` visual is a single portrait "brand creative" (brand-creative.jpg) with a few floating, `aria-hidden` decorative stat cards (Impressions / Completion rate / ROAS / a Delivery mini-bar), not a chart dashboard — the client asked for a product-photo-with-stats look over the old chart grid.
- `src/components/BidstreamCanvas.tsx` — hero canvas animation (pauses off-screen, static frame under prefers-reduced-motion).

## Conventions
- Design tokens live in `src/app/globals.css` (`@theme`): `night-*` surfaces, `glow-*` decorative accents, `chart-*` mark colors (validated for contrast on the dark surface — don't lighten them).
- Fonts: Space Grotesk (`font-display`, headings), Inter (body), JetBrains Mono (`font-mono`, data labels/eyebrows).
- All dashboard/metric numbers on the page are illustrative and marked `aria-hidden`; keep them plausible, not claims.
- Every animation must respect `prefers-reduced-motion` (framer-motion `useReducedMotion` or the CSS media query in globals.css).
- Contact email `contact@urbani.tv` is a placeholder — defined once in `FinalCTA.tsx` (`CONTACT_EMAIL`).
- `LogoStrip.tsx` shows real major-advertiser logos (SVGs from Wikimedia Commons in `/public/partners`, inverted to white via CSS) per client request; clear brand permissions before public launch.
