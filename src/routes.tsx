import type { ScreenGroup } from './types';
import SplashScreen from './screens/customer/SplashScreen';
import { RegisterLocal, RegisterTourist } from './screens/customer/Register';
import Home from './screens/customer/Home';
import BrowseHubs from './screens/customer/BrowseHubs';
import HubMenu from './screens/customer/HubMenu';
import Product from './screens/customer/Product';
import Checkout from './screens/customer/Checkout';
import AddressOutOfRange from './screens/customer/AddressOutOfRange';
import Payment from './screens/customer/Payment';
import OrderPlaced from './screens/customer/OrderPlaced';
import TrackOrder from './screens/customer/TrackOrder';
import OrderRejected from './screens/customer/OrderRejected';
import ReceiptRating from './screens/customer/ReceiptRating';
import Complaint from './screens/customer/Complaint';
import Profile from './screens/customer/Profile';
import KitchenOrders from './screens/restaurant/KitchenOrders';
import KitchenReject from './screens/restaurant/KitchenReject';
import KitchenPrepare from './screens/restaurant/KitchenPrepare';
import KitchenAvailability from './screens/restaurant/KitchenAvailability';
import ShipperDeliver from './screens/restaurant/ShipperDeliver';
import StaffComplaint from './screens/restaurant/StaffComplaint';
import AdminVouchers from './screens/restaurant/AdminVouchers';
import AdminVoucherForm from './screens/restaurant/AdminVoucherForm';
import ManagerReports from './screens/restaurant/ManagerReports';

export const screenGroups: ScreenGroup[] = [
  {
    id: 'customer',
    title: 'Customer UI',
    subtitle: 'Local customers and tourists ordering food',
    screens: [
      { id: 'splash', title: 'Splash screen', component: SplashScreen },
      { id: 'register-local', title: 'UC1 Register · Local customer', component: RegisterLocal },
      { id: 'register-tourist', title: 'UC1 Register · Foreign tourist', component: RegisterTourist },
      { id: 'home', title: 'Home', component: Home },
      { id: 'browse-hubs', title: 'UC1 Browse hubs and brands', component: BrowseHubs },
      { id: 'hub-menu', title: 'UC1 Hub menu and availability', component: HubMenu },
      { id: 'product', title: 'Product', component: Product },
      { id: 'checkout', title: 'UC1 Checkout and payment', component: Checkout },
      { id: 'address-out-of-range', title: 'UC1 Address outside delivery distance', component: AddressOutOfRange },
      { id: 'payment', title: 'Payment', component: Payment },
      { id: 'order-placed', title: 'Pop up message', component: OrderPlaced },
      { id: 'track-order', title: 'UC1 Track and cancel order', component: TrackOrder },
      { id: 'order-rejected', title: 'UC1 Order rejected and refunded', component: OrderRejected },
      { id: 'receipt-rating', title: 'UC1 Receipt and rating', component: ReceiptRating },
      { id: 'complaint', title: 'UC1 Complaint', component: Complaint },
      { id: 'profile', title: 'User profile', component: Profile }
    ]
  },
  {
    id: 'restaurant',
    title: 'Restaurant UI',
    subtitle: 'Kitchen, shipper, office staff, admin and manager',
    screens: [
      { id: 'kitchen-orders', title: 'UC2 Kitchen · Confirm or reject orders', component: KitchenOrders },
      { id: 'kitchen-reject', title: 'UC2 Kitchen · Reject order with reason', component: KitchenReject },
      { id: 'kitchen-prepare', title: 'UC2 Kitchen · Prepare and mark ready', component: KitchenPrepare },
      { id: 'kitchen-availability', title: 'UC2 Kitchen · Menu item availability', component: KitchenAvailability },
      { id: 'shipper-deliver', title: 'UC2 Shipper · Deliver order', component: ShipperDeliver },
      { id: 'staff-complaint', title: 'Office staff · Handle complaint and refund', component: StaffComplaint },
      { id: 'admin-vouchers', title: 'UC3 Admin · Manage vouchers', component: AdminVouchers },
      { id: 'admin-voucher-form', title: 'UC3 Admin · Create or edit voucher', component: AdminVoucherForm },
      { id: 'manager-reports', title: 'UC4 Manager · Reports', component: ManagerReports }
    ]
  }
];

export const defaultPath = `/${screenGroups[0].id}/${screenGroups[0].screens[0].id}`;
