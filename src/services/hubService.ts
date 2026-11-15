import { hubs, hubMenu } from '../mocks';
import { request, mocksEnabled } from './api';
import type { Hub, MenuItem } from '../types/domain';
const delay=(ms=220)=>new Promise(resolve=>setTimeout(resolve,ms));
export const hubService = { async getHubs():Promise<Hub[]> { if(mocksEnabled()){await delay();return hubs;}return request('/hubs'); }, async getMenu(hubId:string):Promise<MenuItem[]> { if(mocksEnabled()){await delay();return hubMenu;}return request(`/hubs/${encodeURIComponent(hubId)}/menu`); }, async togglePause(hubId:string,paused:boolean):Promise<void>{if(mocksEnabled()){await delay();return;}return request(`/hubs/${encodeURIComponent(hubId)}/pause`,{method:'PATCH',body:JSON.stringify({paused})});} };
