const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');
const useMocks = import.meta.env.VITE_USE_MOCKS !== 'false';
export class ApiError extends Error { constructor(message: string, public status: number) { super(message); this.name='ApiError'; } }
export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('saigonbite.token');
  const response = await fetch(`${baseUrl}${path}`, { ...init, headers: { 'Content-Type':'application/json', ...(token?{Authorization:`Bearer ${token}`} : {}), ...init.headers } });
  if (!response.ok) { const message=await response.text().catch(()=>response.statusText); throw new ApiError(message||response.statusText,response.status); }
  if (response.status===204) return undefined as T;
  return response.json() as Promise<T>;
}
export function mocksEnabled() { return useMocks; }
