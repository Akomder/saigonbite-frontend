# SaigonBite frontend API contract

Base URL is `VITE_API_BASE_URL` (default `http://localhost:5000/api`). JSON endpoints require `Content-Type: application/json`; authenticated requests use `Authorization: Bearer <token>`. Error responses should use `{ "message": "Human-readable error" }`.

## Shared shapes

`User`: `{ id, name, email, role }`, where role is `customer | kitchen | admin | driver | manager`.
`Hub`: `{ id, name, distanceKm, eta, status, tone, brands, closed? }`.
`MenuItem`: `{ id, name, brand, price, available, category }`.
`Order`: `{ id, items, meta, stage }`, where stage is `New | Preparing | Ready | Out for delivery | Delivered | Rejected`.

## Endpoints

| Method | Endpoint | Request | Response |
|---|---|---|---|
| POST | `/auth/login` | `{ email, password }` | `{ token, user: User }` |
| GET | `/auth/me` | — | `User` |
| GET | `/hubs` | — | `Hub[]` |
| GET | `/hubs/:hubId/menu` | — | `MenuItem[]` |
| GET | `/menu/featured` | — | `FoodItem[]` (`id`, `name`, `brand`, `rating`, `category`, optional `photo`) |
| PATCH | `/hubs/:hubId/pause` | `{ paused: boolean }` | `204 No Content` |
| GET | `/orders` | — | `Order[]` |
| POST | `/orders` | `{ hubId, items: [{ menuItemId, quantity }], address, paymentMethod }` | `Order` |
| PATCH | `/orders/:orderId/status` | `{ status }` | `Order` |
| GET | `/kitchen/orders?hubId=:hubId&status=:status` | — | `Order[]` |
| PATCH | `/kitchen/orders/:orderId/status` | `{ status }` | `Order` |
| POST | `/kitchen/orders/:orderId/reject` | `{ reason }` | `204 No Content` |
| PATCH | `/kitchen/hubs/:hubId/pause` | `{ paused: boolean }` | `204 No Content` |

All identifiers are URL-encoded by the client. Mock mode returns typed seed data after a short delay; set `VITE_USE_MOCKS=false` to use the HTTP endpoints.
