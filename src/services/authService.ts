import { request, mocksEnabled } from './api';
import type { User } from '../types/domain';
export const authService = { async me(): Promise<User | null> { if(mocksEnabled()) { await new Promise(r=>setTimeout(r,180)); return null; } return request<User>('/auth/me'); }, async login(email:string,password:string):Promise<{token:string;user:User}>{ const result=await request<{token:string;user:User}>('/auth/login',{method:'POST',body:JSON.stringify({email,password})});localStorage.setItem('saigonbite.token',result.token);return result; } };
