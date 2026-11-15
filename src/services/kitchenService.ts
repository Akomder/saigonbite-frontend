import { request } from './api';
import { mapHub, mapKitchenOrder, mapMenuItem } from './mappers';
import type { ApiHub, ApiMenuItem, ApiOrder, Hub, KitchenOrder, MenuItem } from '../types/domain';
export interface KitchenQueue {hub:Hub;orders:KitchenOrder[];}
function fromRaw(rows:ApiOrder[]):KitchenOrder[]{return rows.map(mapKitchenOrder).filter((order):order is KitchenOrder=>order!==null);}
export const kitchenService={
  async getKitchenOrders():Promise<KitchenQueue>{const result=await request<{hub:ApiHub;incoming:ApiOrder[];in_progress:ApiOrder[]}>('/kitchen/orders');return{hub:mapHub(result.hub),orders:[...fromRaw(result.incoming),...fromRaw(result.in_progress)]};},
  async transition(orderId:number,stage:'Preparing'|'Ready'):Promise<void>{if(stage==='Preparing'){await request(`/kitchen/orders/${orderId}/confirm`,{method:'POST'});await request(`/kitchen/orders/${orderId}/advance`,{method:'POST',body:JSON.stringify({status:'Preparing'})});}else await request(`/kitchen/orders/${orderId}/advance`,{method:'POST',body:JSON.stringify({status:'Ready'})});},
  async reject(orderId:number,reason:string):Promise<void>{await request(`/kitchen/orders/${orderId}/reject`,{method:'POST',body:JSON.stringify({reason})});},
  async setPaused(paused:boolean):Promise<Hub>{const result=await request<{hub:ApiHub}>('/kitchen/hub/pause',{method:'PATCH',body:JSON.stringify({paused})});return mapHub(result.hub);},
  async getMenu():Promise<MenuItem[]>{const result=await request<{menu:ApiMenuItem[]}>('/kitchen/menu');return result.menu.map(mapMenuItem);},
  async setAvailability(menuItemId:number,available:boolean):Promise<void>{await request(`/kitchen/menu/${menuItemId}/availability`,{method:'PATCH',body:JSON.stringify({available})});}
};
