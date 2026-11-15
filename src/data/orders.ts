import type { Option, TimelineStep } from '../types';

export const quietHubDiscount = 5000;
export const deliveryFee = 25000;
export const voucherCodes: Record<string, number> = { SAIGON10: 0.1, WELCOME20: 0.2, LUNCH15: 0.15 };

export const paymentOptions: Option[] = [
  { id: 'cash', title: 'Cash on delivery', subtitle: 'Pay the shipper when your order arrives' },
  { id: 'wallet', title: 'MoMo · ZaloPay · Bank QR', subtitle: 'Local customers' },
  { id: 'card', title: 'Foreign credit or debit card', subtitle: 'Tourists · Visa, Mastercard' }
];

export const trackingSteps: TimelineStep[] = [
  { label: 'Order placed', time: '12:01', state: 'done' },
  { label: 'Confirmed by hub', time: '12:02', state: 'current' },
  { label: 'Preparing', state: 'pending' },
  { label: 'Ready for pickup', state: 'pending' },
  { label: 'Out for delivery', state: 'pending' },
  { label: 'Delivered', state: 'pending' }
];

export const rejectedSteps: TimelineStep[] = [
  { label: 'Order placed', time: '12:10', state: 'done' },
  { label: 'Rejected by hub', time: '12:11', state: 'current' }
];

export const complaintReasons: Option[] = [
  { id: 'wrongItem', title: 'Wrong item' },
  { id: 'lateDelivery', title: 'Late delivery', subtitle: 'Arrived more than 20 min after the estimate' },
  { id: 'missingItem', title: 'Missing item' },
  { id: 'qualityProblem', title: 'Quality problem' }
];

export const kitchenTabs = ['New', 'Preparing', 'Ready'] as const;

export interface KitchenOrder {
  id: string;
  items: string;
  meta: string;
  stage: (typeof kitchenTabs)[number];
}

export const kitchenOrders: KitchenOrder[] = [
  { id: '#SB-1044', items: '2 × Pho Bo Tai · 1 × Goi Ga Bap Cai', meta: 'Placed 1 min ago · cash on delivery', stage: 'New' },
  { id: '#SB-1045', items: '1 × Banh Mi Thit Nuong', meta: 'Placed 3 min ago · MoMo paid', stage: 'New' },
  { id: '#SB-1043', items: '2 × Pho Bo Tai · 1 × Banh Mi Thit Nuong', meta: 'Started 6 min ago · target 15 min', stage: 'Preparing' },
  { id: '#SB-1041', items: '1 × Pho Ga', meta: 'Started 9 min ago · target 15 min', stage: 'Preparing' },
  { id: '#SB-1040', items: '3 × Goi Ga Bap Cai', meta: 'Started 11 min ago · target 12 min', stage: 'Preparing' },
  { id: '#SB-1039', items: '1 × Pho Bo Tai', meta: 'Waiting for shipper', stage: 'Ready' }
];

export const rejectReasons: Option[] = [
  { id: 'outOfStock', title: 'Item out of stock', subtitle: 'The whole order is rejected' },
  { id: 'tooBusy', title: 'Kitchen too busy' },
  { id: 'other', title: 'Other reason' }
];

export const prepareChecklist = [
  { label: '2 × Pho Bo Tai', checked: true },
  { label: 'Extra beef, no scallion', checked: true },
  { label: '1 × Banh Mi Thit Nuong', checked: false },
  { label: 'Less chili', checked: false }
] as const;

export const complaintDecisions: Option[] = [
  { id: 'fullRefund', title: 'Full refund', subtitle: 'Refund 137.000đ' },
  { id: 'partialRefund', title: 'Partial refund', subtitle: 'Refund the delivery fee 25.000đ' },
  { id: 'rejectComplaint', title: 'Reject complaint' }
];

export const complaintTimeline = [
  { label: 'Placed', value: '12:01' },
  { label: 'Ready', value: '12:22' },
  { label: 'Delivered', value: '13:15', tone: 'red' }
] as const;
