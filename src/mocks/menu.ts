import type { FoodItem, Hub, MenuItem } from '../types';

export const homeFilters = ['All', 'Pho', 'Banh Mi', 'Salad', 'Rice'] as const;

export const foodItems: FoodItem[] = [
  { id: 'phoBoTai', name: 'Pho Bo Tai', brand: 'Pho Saigon', rating: 4.9, category: 'Pho' },
  { id: 'banhMiNuong', name: 'Banh Mi Nuong', brand: 'Banh Mi Corner', rating: 4.8, category: 'Banh Mi' },
  { id: 'goiGaBapCai', name: 'Goi Ga Bap Cai', brand: 'Green Bowl', rating: 4.6, category: 'Salad' },
  { id: 'comTamSuon', name: 'Com Tam Suon', brand: 'Saigon Rice', rating: 4.5, category: 'Rice' },
  { id: 'phoGa', name: 'Pho Ga', brand: 'Pho Saigon', rating: 4.7, category: 'Pho' },
  { id: 'banhMiChaLua', name: 'Banh Mi Cha Lua', brand: 'Banh Mi Corner', rating: 4.4, category: 'Banh Mi' },
  { id: 'goiCuonTomThit', name: 'Goi Cuon Tom Thit', brand: 'Green Bowl', rating: 4.6, category: 'Salad' },
  { id: 'comGaXoiMo', name: 'Com Ga Xoi Mo', brand: 'Saigon Rice', rating: 4.3, category: 'Rice' }
];

export const hubs: Hub[] = [
  {
    id: 'district1',
    name: 'Hub District 1',
    distanceKm: 2.4,
    eta: '~45 min',
    status: 'Busy',
    tone: 'amber',
    brands: 'Pho Saigon · Banh Mi Corner'
  },
  {
    id: 'district3',
    name: 'Hub District 3',
    distanceKm: 3.1,
    eta: '~25 min',
    status: 'Quiet',
    tone: 'green',
    brands: 'Pho Saigon · Banh Mi Corner · Green Bowl'
  },
  {
    id: 'binhThanh',
    name: 'Hub Binh Thanh',
    distanceKm: 5.8,
    eta: 'Not taking orders',
    status: 'Full',
    tone: 'red',
    brands: 'Saigon Rice · Green Bowl',
    closed: true
  },
  {
    id: 'thuDuc',
    name: 'Hub Thu Duc',
    distanceKm: 6.9,
    eta: '~30 min',
    status: 'Quiet',
    tone: 'green',
    brands: 'Pho Saigon · Saigon Rice'
  }
];

export const hubFilters = ['All', 'Pho', 'Banh Mi', 'Rice'] as const;

export const hubMenu: MenuItem[] = [
  { id: 'phoBoTai', name: 'Pho Bo Tai', brand: 'Pho Saigon', price: 65000, available: true, category: 'Pho' },
  { id: 'phoGa', name: 'Pho Ga', brand: 'Pho Saigon', price: 55000, available: true, category: 'Pho' },
  {
    id: 'banhMiThitNuong',
    name: 'Banh Mi Thit Nuong',
    brand: 'Banh Mi Corner',
    price: 35000,
    available: true,
    category: 'Banh Mi'
  },
  {
    id: 'banhMiChaLua',
    name: 'Banh Mi Cha Lua',
    brand: 'Banh Mi Corner',
    price: 30000,
    available: false,
    category: 'Banh Mi'
  },
  { id: 'goiGaBapCai', name: 'Goi Ga Bap Cai', brand: 'Green Bowl', price: 55000, available: true, category: 'Salad' }
];

export const menuFilters = ['All', 'Pho', 'Banh Mi', 'Salad'] as const;

export const kitchenAvailability = [
  { id: 'phoBoTai', name: 'Pho Bo Tai', available: true },
  { id: 'phoGa', name: 'Pho Ga', available: true },
  { id: 'banhMiThitNuong', name: 'Banh Mi Thit Nuong', available: true },
  { id: 'banhMiChaLua', name: 'Banh Mi Cha Lua', available: false },
  { id: 'goiGaBapCai', name: 'Goi Ga Bap Cai', available: true },
  { id: 'goiCuonTomThit', name: 'Goi Cuon Tom Thit', available: false }
] as const;
