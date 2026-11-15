# SaigonBite frontend API contract

The frontend calls the Flask API at `VITE_API_BASE_URL` (default `http://localhost:5000/api`). Responses are wrapped as `{ "data": ... }`; errors are `{ "error": "message", "code": "stable_code", "details"?: ... }`. Authentication uses an HttpOnly Flask session cookie with `credentials: include`, not a browser-readable bearer token. Before mutations, the client obtains `GET /auth/csrf` and sends `X-CSRF-Token`.

## Wire types

All IDs are database integers. Amounts are integer VND. API JSON uses snake_case and the mapper layer converts it to the UI camelCase types.

- `User`: `id, username, full_name, role, customer_type, phone, email, hub_id`. Roles are `customer | kitchen | admin | manager`; customer types are `local | tourist`.
- `Hub`: `id, name, address, capacity, rain_mode, active_orders, load_ratio, status, accepting_orders`.
- `MenuItem`: `id, name, name_vi, brand_id, brand, price_vnd, available`.
- `Order`: `id, number, customer_id, hub_id, hub_name, status, delivery_address, distance_km, items_subtotal_vnd, delivery_fee_vnd, rain_surcharge_vnd, quiet_discount_vnd, voucher_discount_vnd, total_vnd, payment_method, payment_status, reject_reason, created_at, items`.
- `Order.items[]`: `menu_item_id, name, quantity, unit_price_vnd, line_total_vnd`.

## Routes used by the frontend

| Method | Endpoint | Request | Data response |
|---|---|---|---|
| GET | `/auth/csrf` | — | `{csrf_token}` |
| POST | `/auth/login` | `{username,password}` | `{user}` |
| POST | `/auth/register` | `{username,full_name,password,customer_type,phone?,email?}` | `{user}` |
| POST | `/auth/logout` | — | `{status}` |
| GET | `/auth/me` | — | `{user: User | null}`; `null` when signed out |
| GET | `/hubs` | — | `{hubs: Hub[]}` |
| GET | `/hubs/{hub_id}/menu` | — | `{hub,menu: MenuItem[],payment_methods}` |
| POST | `/orders/preview` | `{hub_id,items:[{menu_item_id,quantity}],distance_km,address,voucher_code,payment_method}` | quote with authoritative VND totals and suggestions |
| POST | `/orders` | Same as preview | `{order: Order}` |
| GET | `/orders` | — | `{orders: Order[]}` |
| GET | `/orders/{order_id}` | — | `{order}` |
| POST | `/orders/{order_id}/cancel` | — | `{order}` |
| GET | `/kitchen/orders` | — | `{hub,incoming: Order[],in_progress: Order[]}` |
| POST | `/kitchen/orders/{order_id}/confirm` | — | `{order}` |
| POST | `/kitchen/orders/{order_id}/reject` | `{reason}` | `{order}` |
| POST | `/kitchen/orders/{order_id}/advance` | `{status:"Preparing"|"Ready"}` | `{order}` |
| PATCH | `/kitchen/hub/pause` | `{paused:boolean}` | `{hub}` |
| GET | `/kitchen/menu` | — | `{menu: MenuItem[]}` |
| PATCH | `/kitchen/menu/{menu_item_id}/availability` | `{available:boolean}` | `{id,available}` |
| GET | `/admin/vouchers` | optional `q`, `state` | `{vouchers: Voucher[]}` |
| POST | `/admin/vouchers` | snake_case voucher input | `{voucher}` |
| PATCH | `/admin/vouchers/{voucher_id}` | snake_case editable fields | `{voucher}` |
| POST | `/admin/vouchers/{voucher_id}/deactivate` | — | `{voucher}` |
| GET | `/manager/reports/{kind}` | `date_from,date_to,hub_id?` query | `{report:{title,summary,tables}}` |

The frontend uses the existing delivery distance rule and validates order previews on the server. This backend has no delivery address book, payment processor/transaction, driver, review, or complaint tables; the removed prototype screens for those features are not live API flows. Hub pause state is persisted separately in additive `hub_controls`; menu availability uses the existing `hub_menu_items.available` column.
