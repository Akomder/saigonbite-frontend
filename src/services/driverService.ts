import { request } from './api';
import { mapOrder } from './mappers';
import type { ApiOrder, Order } from '../types/domain';

async function list(path: string): Promise<Order[]> {
  const result = await request<{ orders: ApiOrder[] }>(path);
  return result.orders.map(mapOrder);
}

async function mutate(path: string): Promise<Order> {
  const result = await request<{ order: ApiOrder }>(path, { method: 'POST' });
  return mapOrder(result.order);
}

export const driverService = {
  getAvailable: () => list('/driver/orders/available'),
  getActive: () => list('/driver/orders/active'),
  getHistory: () => list('/driver/orders/history'),
  accept: (id: number) => mutate(`/driver/orders/${id}/accept`),
  pickup: (id: number) => mutate(`/driver/orders/${id}/pickup`),
  complete: (id: number) => mutate(`/driver/orders/${id}/complete`),
};
