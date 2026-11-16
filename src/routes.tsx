import type {ComponentType} from 'react';
import type {UserRole} from './types/domain';
import Home from './pages/customer/Home';import BrowseHubs from './pages/customer/BrowseHubs';import HubMenu from './pages/customer/HubMenu';import Checkout from './pages/customer/Checkout';import Orders from './pages/customer/Orders';import TrackOrder from './pages/customer/TrackOrder';import Profile from './pages/customer/Profile';
import KitchenOrders from './pages/restaurant/KitchenOrders';import KitchenAvailability from './pages/restaurant/KitchenAvailability';import AdminVouchers from './pages/restaurant/AdminVouchers';import AdminVoucherForm from './pages/restaurant/AdminVoucherForm';import ManagerReports from './pages/restaurant/ManagerReports';
import AvailablePickups from './pages/driver/AvailablePickups';import ActiveDeliveries from './pages/driver/ActiveDeliveries';import DeliveryHistory from './pages/driver/DeliveryHistory';
export interface AppRoute{path:string;component:ComponentType;roles:UserRole[];}
export const customerRoutes:AppRoute[]=[
 {path:'/',component:Home,roles:['customer']},{path:'/hubs',component:BrowseHubs,roles:['customer']},{path:'/hubs/:hubId',component:HubMenu,roles:['customer']},{path:'/checkout',component:Checkout,roles:['customer']},{path:'/orders',component:Orders,roles:['customer']},{path:'/orders/:orderId',component:TrackOrder,roles:['customer']},{path:'/profile',component:Profile,roles:['customer']}
];
export const operationsRoutes:AppRoute[]=[
 {path:'/restaurant/kitchen-orders',component:KitchenOrders,roles:['kitchen']},{path:'/restaurant/menu',component:KitchenAvailability,roles:['kitchen']},{path:'/admin/vouchers',component:AdminVouchers,roles:['admin']},{path:'/admin/vouchers/new',component:AdminVoucherForm,roles:['admin']},{path:'/admin/vouchers/:voucherId',component:AdminVoucherForm,roles:['admin']},{path:'/manager/reports',component:ManagerReports,roles:['manager']}
];
export const driverRoutes:AppRoute[]=[
 {path:'/driver',component:AvailablePickups,roles:['driver']},
 {path:'/driver/active',component:ActiveDeliveries,roles:['driver']},
 {path:'/driver/history',component:DeliveryHistory,roles:['driver']}
];
