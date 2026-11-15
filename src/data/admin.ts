import type { ChartDatum, Tone, Voucher } from '../types';

export const vouchers: Voucher[] = [
  {
    code: 'SAIGON10',
    rule: '10% off items · min order 100.000đ',
    period: '1 Nov - 30 Nov 2026 · limit 500 uses',
    status: 'Active',
    tone: 'green'
  },
  {
    code: 'FIRST30',
    rule: '30.000đ off items · min order 150.000đ',
    period: '1 Nov - 15 Nov 2026 · limit 200 uses',
    status: 'Active',
    tone: 'green'
  },
  {
    code: 'WELCOME20',
    rule: '20% off items · min order 120.000đ',
    period: '1 Oct - 31 Dec 2026 · limit 300 uses',
    status: 'Active',
    tone: 'green'
  },
  {
    code: 'LUNCH15',
    rule: '15% off items · min order 100.000đ',
    period: 'Ended 31 Oct 2026 · limit 100 uses',
    status: 'Expired',
    tone: 'neutral'
  }
];

export const reportTabs = ['Sales', 'Hub workload', 'Delivery'] as const;

export const reportFilters = ['This week ▾', 'All hubs ▾'] as const;

export const reportStats = [
  { label: 'Revenue today', value: '18,4M đ' },
  { label: 'Orders', value: '212' },
  { label: 'Avg ticket', value: '86.800đ' }
] as const;

export const salesByDay: ChartDatum[] = [
  { label: 'Mon', value: 11 },
  { label: 'Tue', value: 13 },
  { label: 'Wed', value: 12 },
  { label: 'Thu', value: 15 },
  { label: 'Fri', value: 17 },
  { label: 'Sat', value: 21 },
  { label: 'Sun', value: 18 }
];

export const hubWorkload: { label: string; value: number; tone: Tone }[] = [
  { label: 'District 1', value: 0.8, tone: 'amber' },
  { label: 'District 3', value: 0.4, tone: 'green' },
  { label: 'Binh Thanh', value: 1, tone: 'red' }
];

export const deliveryStats: { label: string; value: string; tone?: Tone }[] = [
  { label: 'Avg delivery time', value: '34 min' },
  { label: 'On time (within 45 min)', value: '91%', tone: 'green' },
  { label: 'Failed deliveries', value: '2.1%', tone: 'red' }
];
