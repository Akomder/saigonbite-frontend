# SaigonBite

SaigonBite is a responsive React 18 + TypeScript + Vite web app for customer ordering and restaurant operations. The app uses clean browser routes and role-specific navigation; the customer experience starts at `/`, while operations start at `/restaurant/kitchen-orders`.

## Run locally

```sh
npm install
npm run dev
npm run build
npm run typecheck
```

Copy `.env.example` to `.env.local` to configure the API base URL and mock mode. `VITE_USE_MOCKS=true` is the default, so the app starts with asynchronous typed demo data. The endpoint contract is documented in [API_CONTRACT.md](./API_CONTRACT.md).

## Structure

```text
src/
  components/ui/       reusable controls and feedback components
  layouts/             customer, kitchen and auth shells
  mocks/               typed seed data for the mock services
  pages/customer/      customer ordering and account pages
  pages/restaurant/    kitchen, shipper, staff and admin pages
  services/            HTTP client and domain service modules
  state/               persistent client state for demo order workflows
  types/               API domain types (legacy UI types remain in src/types.ts)
```

The demo kitchen order stages and pause state persist in local storage. The service modules isolate backend calls from page components so the mock data source can be switched to an API without changing screens.
