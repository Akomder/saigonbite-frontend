# SaigonBite Web

Responsive React 18 + TypeScript + Vite 6 + Tailwind CSS 4 implementation of the Saigon Bites Figma page: 16 Customer UI screens and 9 Restaurant UI screens, adapting from 375px phones to 1440px+ desktops.

## Run

```
npm install
npm run dev
npm run build
npm run typecheck
```

Routing uses `HashRouter`, so the build runs on any static host. Screens open at `/#/customer/home`, `/#/restaurant/kitchen-orders`, and so on.

## Design tokens

All Figma values are Tailwind v4 theme tokens in `src/index.css` under `@theme`, so they are available as CSS custom properties and as utilities:

- Colors: `navy`, `blue`, `tint`, `cream`, `sand`, `line`, `ink`, `muted`, `danger`, `amber`, `success`, plus the wash tones (`navy-soft`, `navy-wash`, `success-wash`, `amber-wash`, `amber-ink`, `danger-wash`, `neutral-wash`, `backdrop`)
- Fonts: `font-sans` (Roboto), `font-display` (Poppins)
- Radii: `rounded-field` (14px), `rounded-card` (16px), `rounded-control` (16px), `rounded-modal` (24px), `rounded-frame` (35px)
- Spacing: `gutter` (24px), `control` (56px button height), `field` (50px input height)

## Structure

```
src/
  index.css              theme tokens and base styles
  routes.tsx             screen groups: single source for nav and routes
  components/icons/      SVG icon components (createIcon factory, BowlLogo, StarIcon)
  components/ui/         Button, Field, Segmented, ChipRow, Card, Modal, Timeline, BarChart, ...
  components/layout/     AppShell, Navbar, MobileDrawer, ScreenNav, ScreenLayout, Split
  hooks/                 useDisclosure, useEscapeKey, useFocusTrap
  data/                  menu, orders, admin: all copy, prices, statuses
  screens/customer/      one file per customer screen
  screens/restaurant/    one file per restaurant screen
  utils/                 cn, formatVnd
```

## Food photos

Every photo is a `PhotoSlot`. Pass `src` to fill it, or set `photo` on an item in `src/data/menu.ts`. Put images in `public/images`.

## Responsive behavior

- Below `lg` the screen list lives in an accessible drawer (focus trap, Escape to close, `aria-expanded` on the menu button). From `lg` up it is a persistent sidebar.
- `ScreenLayout` holds the page title and back button; `Split` turns a two-part screen into one column on mobile and a main column plus a sticky side column at `lg`.
- Card lists use 1 column on mobile, 2 at `md`, and 3 to 4 at `lg` where it fits (food, hubs, vouchers, availability).
- Chip rows scroll horizontally on mobile and wrap from `sm`.
- Mobile-only sticky bars (Home bottom nav, hub cart bar) become a side summary on desktop.
