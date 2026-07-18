# Sebastián Luján — Portfolio

A personal portfolio for **Sebastián Luján**, Senior Backend Engineer (fintech /
crypto). Built with the **Next.js 16 App Router** and **React 19**, in a dark,
typography-first style (Geist Sans + Geist Mono, single centered column, no
Tailwind).

## Structure

| Path | Role |
| --- | --- |
| `lib/profile.ts` | Identity, bio, education, skills, and awards |
| `lib/work.ts` | Experience entries (roles, highlights, named projects) |
| `app/page.tsx` | Homepage — tagline, experience index, awards, skills |
| `app/work/[slug]/page.tsx` | Role detail page (highlights/projects via `react-markdown`) |
| `app/about/page.tsx` | About — full bio, education, contact |
| `components/Header.tsx` | Site header + nav (About / GitHub / LinkedIn) |
| `app/globals.css` | Design tokens + all styling |

## Content

All content is data-driven from `lib/profile.ts` and `lib/work.ts` — edit those
two files to update the site. Pages are statically rendered (`generateStaticParams`
prerenders each `/work/[slug]`).

> **TODO:** The GitHub and LinkedIn URLs in `lib/profile.ts` are best-guess
> handles. Confirm/replace them (and swap the `SL` avatar placeholder for a real
> image) before publishing.

## Develop

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```
