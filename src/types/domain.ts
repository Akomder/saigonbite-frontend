export type UserRole = 'customer' | 'kitchen' | 'admin' | 'manager';
export type CustomerType = 'local' | 'tourist';
export type PaymentMethod = 'cash' | 'ewallet' | 'bank_qr' | 'card';
export type ApiOrderStatus = 'Placed' | 'Confirmed' | 'Rejected' | 'Cancelled' | 'Preparing' | 'Ready' | 'Out for delivery' | 'Delivered' | 'Failed';
export type HubState = 'quiet' | 'normal' | 'busy' | 'full';

// API DTOs mirror Flask JSON keys and use numeric database IDs.
export interface ApiUser { id:number; username:string; full_name:string; role:UserRole; customer_type:CustomerType|null; phone:string|null; email:string|null; hub_id:number|null; }
export interface ApiHub { id:number; name:string; address:string; capacity:number; rain_mode:boolean; active_orders:number; load_ratio:number; status:HubState; accepting_orders:boolean; }
export interface ApiMenuItem { id:number; name:string; name_vi:string; brand_id:number; brand:string; price_vnd:number; available:boolean; }
export interface ApiOrderItem { menu_item_id:number; name:string; quantity:number; unit_price_vnd:number; line_total_vnd:number; }
export interface ApiOrder { id:number; number:string|null; customer_id:number; hub_id:number; hub_name:string; status:ApiOrderStatus; delivery_address:string; distance_km:number; items_subtotal_vnd:number; delivery_fee_vnd:number; rain_surcharge_vnd:number; quiet_discount_vnd:number; voucher_discount_vnd:number; total_vnd:number; payment_method:PaymentMethod; payment_status:string; reject_reason:string|null; created_at:string|null; items:ApiOrderItem[]; }
export interface ApiQuote { hub:{id:number;name:string;status:HubState}; items:{menu_item_id:number;name:string;quantity:number;unit_price_vnd:number;line_total_vnd:number}[]; items_subtotal_vnd:number; delivery_fee_vnd:number; rain_surcharge_vnd:number; quiet_discount_vnd:number; voucher_discount_vnd:number; total_vnd:number; payment_method:PaymentMethod; suggestions:ApiHub[]; }

// UI-facing normalized shapes. All mappings live in services/mappers.ts.
export interface User { id:number; username:string; fullName:string; role:UserRole; customerType:CustomerType|null; phone:string|null; email:string|null; hubId:number|null; }
export interface Hub { id:number; name:string; address:string; capacity:number; rainMode:boolean; activeOrders:number; loadRatio:number; status:HubState; acceptingOrders:boolean; }
export interface MenuItem { id:number; name:string; nameVi:string; brandId:number; brand:string; price:number; available:boolean; }
export interface OrderItem { menuItemId:number; name:string; quantity:number; unitPrice:number; lineTotal:number; }
export interface Order { id:number; number:string; customerId:number; hubId:number; hubName:string; status:ApiOrderStatus; deliveryAddress:string; distanceKm:number; subtotal:number; deliveryFee:number; rainSurcharge:number; quietDiscount:number; voucherDiscount:number; total:number; paymentMethod:PaymentMethod; paymentStatus:string; rejectReason:string|null; createdAt:string|null; items:OrderItem[]; }
export interface KitchenOrder { id:number; number:string; items:string; meta:string; stage:'New'|'Preparing'|'Ready'; status:ApiOrderStatus; }
export interface Voucher { id:number; code:string; description:string; discountType:'percent'|'fixed'; value:number; validFrom:string; validTo:string; minOrder:number; usageLimit:number|null; usedCount:number; oncePerCustomer:boolean; active:boolean; status:string; }
export interface ReportData { title:string; summary:{label:string;value:string|number}[]; tables:{title:string;headers:string[];rows:(string|number)[][]}[]; }
