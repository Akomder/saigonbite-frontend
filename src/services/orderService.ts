import { request } from './api';
import { mapOrder } from './mappers';
import type { ApiOrder, ApiQuote, Order, PaymentMethod } from '../types/domain';
export interface PlaceOrderInput {hubId:number;items:{menuItemId:number;quantity:number}[];distanceKm:number;address:string;voucherCode?:string;paymentMethod:PaymentMethod;}
export const orderService={
  async preview(input:PlaceOrderInput):Promise<ApiQuote>{return request('/orders/preview',{method:'POST',body:JSON.stringify({hub_id:input.hubId,items:input.items.map(item=>({menu_item_id:item.menuItemId,quantity:item.quantity})),distance_km:input.distanceKm,address:input.address,voucher_code:input.voucherCode||'',payment_method:input.paymentMethod})});},
  async createOrder(input:PlaceOrderInput):Promise<Order>{const result=await request<{order:ApiOrder}>('/orders',{method:'POST',body:JSON.stringify({hub_id:input.hubId,items:input.items.map(item=>({menu_item_id:item.menuItemId,quantity:item.quantity})),distance_km:input.distanceKm,address:input.address,voucher_code:input.voucherCode||'',payment_method:input.paymentMethod})});return mapOrder(result.order);},
  async getOrders():Promise<Order[]>{const result=await request<{orders:ApiOrder[]}>('/orders');return result.orders.map(mapOrder);},
  async getOrder(orderId:number):Promise<Order>{const result=await request<{order:ApiOrder}>(`/orders/${orderId}`);return mapOrder(result.order);},
  async cancel(orderId:number):Promise<Order>{const result=await request<{order:ApiOrder}>(`/orders/${orderId}/cancel`,{method:'POST'});return mapOrder(result.order);}
};
