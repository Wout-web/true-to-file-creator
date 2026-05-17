# Atelier BCI — Website Plan

Build the full site per spec. Note: project uses **TanStack Start** (not React Router) — I'll use TanStack Router file routes, which gives the same per-page SSR/SEO benefits the spec wants. Everything else maps 1:1.

## Stack adaptations
- Routing: TanStack Router (file routes under `src/routes/`)
- Animations: `motion/react` (Framer Motion)
- i18n: `i18next` + `react-i18next` + `i18next-browser-languagedetector`, persisted to localStorage
- Fonts: Cormorant Garamond + DM Sans via Google Fonts in `__root.tsx` head
- Styling: Tailwind v4 with brand tokens added to `src/styles.css`

## Design tokens (added to `src/styles.css`)
- `--background: #FAF8F5`, `--foreground: #1A1A1A`
- `--primary: #8B1A1A` (bordeaux), `--secondary: #C9A96E` (gold)
- `--surface: #FFFFFF`, `--border: #E8E0D5`, `--placeholder: #EDE8E0`
- `--font-display: 'Cormorant Garamond'`, `--font-sans: 'DM Sans'`
- Replaces the current blue-ish default palette completely.

## Routes
```
src/routes/
  __root.tsx          # shell: Navbar + Outlet + Footer, fonts, i18n provider
  index.tsx           # Home (B2B)
  products.tsx        # The Formulas — filter tabs + quote modal
  about.tsx           # Editorial about
  contact.tsx         # 2-col + form + map embed
  consumers.tsx       # B2C "Coming Soon" teaser
```
Each route defines its own `head()` with localized title/description.

## Shared components (`src/components/`)
- `Navbar.tsx` — sticky, shrink + blur on scroll, hamburger slide-in on mobile, language dropdown (flag + code)
- `Footer.tsx` — 3 columns; B2C page gets minimal footer
- `LanguageSwitcher.tsx`
- `ImageSlot.tsx` — `<ImageSlot src ratio="3:4" />`; placeholder = `#EDE8E0` bg + centered gold camera SVG + italic "[Photo]" label
- `AnimatedSection.tsx`, `FadeUp.tsx`, `ImageReveal.tsx` (clipPath wipe), `Counter.tsx` (count-up in viewport), `SvgDivider.tsx` (line draw)
- `QuoteModal.tsx` — drawer on mobile, centered dialog on desktop, backdrop blur
- `HorizontalScroller.tsx` — desktop horizontal-via-vertical-scroll (`useScroll`+`useTransform`); mobile swipeable carousel

## i18n
- `src/i18n/index.ts` initializes i18next with NL (default), EN, DE, FR, ES
- Detector order: `localStorage` → `navigator` → fallback NL
- Translation JSONs under `src/i18n/locales/{lang}/common.json` covering nav, headings, body copy, buttons, form labels, footer for all 5 pages
- Language change updates `<html lang>` and persists; no reload

## Page composition (matches spec exactly)
- **/** : opening full-viewport split (parallax right image), Who We Are with stat counters, The Formulas horizontal scroller (3 cards: Masks/Ampoules/Powders), Built For Trade alternating rows, Order CTA section (`#F0EBE3`), Footer
- **/products** : title + filter tabs (All/Masks/Ampoules/Powders) with fade, responsive grid, "Request quote" → `QuoteModal`
- **/about** : 60vh hero with clipPath reveal, 4 editorial sections, inline SVG Europe map with dot markers
- **/contact** : left contact block + Google Maps iframe, right form with subject dropdown, inline success state
- **/consumers** : centered "Coming Soon", soft bg with subtle grain SVG overlay, slow fade

## Contact / Quote form submission
Spec says "Submits to info@beautycareinternational.com" but no backend is mentioned. Default plan: forms compose a prefilled `mailto:` to that address on submit (works without backend, fully client-side, matches the spec's "no backend" tech list). Inline success message shown after submit. If you want real server-side email delivery (Resend via Lovable Cloud), I can add it after — just say the word.

## Constraints honored
- No purple/blue/gradients (except subtle photo overlays), no Inter/Roboto, no SaaS card-grid-with-emoji, no socials, no fax, no cookie banner, no chatbot.

## Out of scope (not in spec)
- Real auth, real CMS, actual quote backend, logo asset (text fallback used until uploaded), real product photography (ImageSlot placeholders).

Ready to build when you approve.