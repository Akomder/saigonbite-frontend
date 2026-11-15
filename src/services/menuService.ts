import { foodItems } from '../mocks/menu';
import type { FoodItem } from '../types';
import { request, mocksEnabled } from './api';
const delay=(ms=200)=>new Promise(resolve=>setTimeout(resolve,ms));
export const menuService={async getFeaturedItems():Promise<FoodItem[]>{if(mocksEnabled()){await delay();return foodItems;}return request('/menu/featured');}};
