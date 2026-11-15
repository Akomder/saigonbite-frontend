import type { ComponentType } from 'react';
import Home from './pages/customer/Home';
import BrowseHubs from './pages/customer/BrowseHubs';
import HubMenu from './pages/customer/HubMenu';
import Product from './pages/customer/Product';
import Checkout from './pages/customer/Checkout';
import AddressOutOfRange from './pages/customer/AddressOutOfRange';
import Payment from './pages/customer/Payment';
import OrderPlaced from './pages/customer/OrderPlaced';
import TrackOrder from './pages/customer/TrackOrder';
import OrderRejected from './pages/customer/OrderRejected';
import ReceiptRating from './pages/customer/ReceiptRating';
import Complaint from './pages/customer/Complaint';
import Profile from './pages/customer/Profile';
import KitchenOrders from './pages/restaurant/KitchenOrders';
import KitchenReject from './pages/restaurant/KitchenReject';
import KitchenPrepare from './pages/restaurant/KitchenPrepare';
import KitchenAvailability from './pages/restaurant/KitchenAvailability';
import ShipperDeliver from './pages/restaurant/ShipperDeliver';
import StaffComplaint from './pages/restaurant/StaffComplaint';
import AdminVouchers from './pages/restaurant/AdminVouchers';
import AdminVoucherForm from './pages/restaurant/AdminVoucherForm';
import ManagerReports from './pages/restaurant/ManagerReports';

export interface AppRoute { path: string; component: ComponentType; role: 'customer' | 'restaurant' | 'admin' | 'manager'; }
export const customerRoutes: AppRoute[] = [
  { path: '/', component: Home, role: 'customer' }, { path: '/hubs', component: BrowseHubs, role: 'customer' },
  { path: '/hubs/:hubId', component: HubMenu, role: 'customer' }, { path: '/products/:productId', component: Product, role: 'customer' },
  { path: '/checkout', component: Checkout, role: 'customer' }, { path: '/checkout/address', component: AddressOutOfRange, role: 'customer' },
  { path: '/checkout/payment', component: Payment, role: 'customer' }, { path: '/orders/placed', component: OrderPlaced, role: 'customer' },
  { path: '/orders', component: TrackOrder, role: 'customer' }, { path: '/orders/rejected', component: OrderRejected, role: 'customer' },
  { path: '/orders/receipt', component: ReceiptRating, role: 'customer' }, { path: '/orders/complaint', component: Complaint, role: 'customer' },
  { path: '/profile', component: Profile, role: 'customer' }
];
export const restaurantRoutes: AppRoute[] = [
  { path: '/restaurant/kitchen-orders', component: KitchenOrders, role: 'restaurant' },
  { path: '/restaurant/kitchen-reject', component: KitchenReject, role: 'restaurant' },
  { path: '/restaurant/kitchen-prepare', component: KitchenPrepare, role: 'restaurant' },
  { path: '/restaurant/menu', component: KitchenAvailability, role: 'restaurant' },
  { path: '/restaurant/shipper-deliveries', component: ShipperDeliver, role: 'restaurant' },
  { path: '/restaurant/complaints', component: StaffComplaint, role: 'restaurant' },
  { path: '/admin/vouchers', component: AdminVouchers, role: 'admin' },
  { path: '/admin/vouchers/edit', component: AdminVoucherForm, role: 'admin' },
  { path: '/manager/reports', component: ManagerReports, role: 'manager' }
];
