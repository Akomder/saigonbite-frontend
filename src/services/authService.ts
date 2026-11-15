import { refreshCsrf, request, resetCsrf } from './api';
import { mapUser } from './mappers';
import type { ApiUser, CustomerType, User } from '../types/domain';
export const authService={
  async me():Promise<User|null>{const result=await request<{user:ApiUser|null}>('/auth/me');return result.user?mapUser(result.user):null;},
  async login(username:string,password:string):Promise<User>{const result=await request<{user:ApiUser}>('/auth/login',{method:'POST',body:JSON.stringify({username,password})});resetCsrf();await refreshCsrf();return mapUser(result.user);},
  async register(payload:{username:string;password:string;fullName:string;customerType:CustomerType;phone?:string;email?:string}):Promise<User>{const result=await request<{user:ApiUser}>('/auth/register',{method:'POST',body:JSON.stringify({username:payload.username,password:payload.password,full_name:payload.fullName,customer_type:payload.customerType,phone:payload.phone,email:payload.email})});resetCsrf();await refreshCsrf();return mapUser(result.user);},
  async logout():Promise<void>{await request('/auth/logout',{method:'POST'});resetCsrf();}
};
