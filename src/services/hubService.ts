import { request } from './api';
import { mapHub, mapMenuItem } from './mappers';
import type { ApiHub, ApiMenuItem, Hub, MenuItem } from '../types/domain';
export interface HubMenuResult { hub:Hub; items:MenuItem[]; paymentMethods:string[]; }
export const hubService={
  async getHubs():Promise<Hub[]>{const result=await request<{hubs:ApiHub[]}>('/hubs');return result.hubs.map(mapHub);},
  async getMenu(hubId:number):Promise<HubMenuResult>{const result=await request<{hub:ApiHub;menu:ApiMenuItem[];payment_methods:string[]}>(`/hubs/${hubId}/menu`);return{hub:mapHub(result.hub),items:result.menu.map(mapMenuItem),paymentMethods:result.payment_methods};},
};
