export type UserRole = 'customer' | 'kitchen' | 'admin' | 'driver' | 'manager';
export interface User { id: string; name: string; email: string; role: UserRole; }
export interface Hub { id: string; name: string; distanceKm: number; eta: string; status: 'Busy' | 'Quiet' | 'Full'; tone: 'neutral' | 'green' | 'amber' | 'red' | 'navy'; brands: string; closed?: boolean; }
export interface MenuItem { id: string; name: string; brand: string; price: number; available: boolean; category: string; }
export interface OrderItem { menuItemId: string; name: string; quantity: number; unitPrice: number; }
export type OrderStatus = 'New' | 'Preparing' | 'Ready' | 'Out for delivery' | 'Delivered' | 'Rejected';
export type PaymentMethod = 'cash' | 'wallet' | 'card';
export interface Order { id: string; items: string; meta: string; stage: OrderStatus; }
