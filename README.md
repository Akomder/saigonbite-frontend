# SaigonBite frontend

SaigonBite is a responsive React 18 + TypeScript + Vite client for the Flask JSON API. Customer, kitchen, admin, and manager routes use role-specific navigation and clean browser URLs.

## Run locally

```powershell
npm install
npm run dev
npm run build
```

Set `.env` to `VITE_API_BASE_URL=http://localhost:5000/api` and `VITE_USE_MOCKS=false`. The client uses an HttpOnly session cookie and CSRF tokens. Start the API before signing in. Seeded development users use password `password`: `an`, `tourist`, `kitchen1`, `kitchen2`, `admin`, and `manager`.

See [API_CONTRACT.md](./API_CONTRACT.md) for the service request and response contract.

## Structure

```text
src/
  components/ui/       reusable controls and feedback components
  layouts/             customer, operations, and auth shells
  pages/customer/      customer ordering and account pages
  pages/restaurant/    kitchen, voucher, and report pages
  services/            HTTP client, mappers, and API service modules
  state/               cart, auth, and live kitchen state
  types/               API DTOs and normalized UI types
```
