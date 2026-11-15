import { hubService } from './hubService';
import type { FoodItem } from '../types';
export const menuService={async getFeaturedItems():Promise<FoodItem[]>{const hubs=await hubService.getHubs();if(!hubs.length)return[];const result=await hubService.getMenu(hubs[0].id);return result.items.filter(item=>item.available).map(item=>({id:item.id,name:item.name,brand:item.brand}));}};
