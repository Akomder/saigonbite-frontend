const baseUrl=(import.meta.env.VITE_API_BASE_URL||'http://localhost:5000/api').replace(/\/$/,'');
let csrfToken:string|undefined;
export class ApiError extends Error { constructor(message:string,public status:number,public code:string){super(message);this.name='ApiError';} }
type Envelope<T>={data:T};
async function raw<T>(path:string,init:RequestInit={}):Promise<T>{
  const response=await fetch(`${baseUrl}${path}`,{...init,credentials:'include',headers:{Accept:'application/json',...(init.body?{'Content-Type':'application/json'}:{}),...(init.headers||{})}});
  const body=await response.json().catch(()=>({}));
  if(!response.ok){const message=typeof body.error==='string'?body.error:body.error?.message||response.statusText;throw new ApiError(message,response.status,body.code||body.error?.code||'request_failed');}
  return body as T;
}
export async function request<T>(path:string,init:RequestInit={}):Promise<T>{
  const method=(init.method||'GET').toUpperCase();
  if(!['GET','HEAD','OPTIONS'].includes(method)&&path!=='/auth/csrf'){
    if(!csrfToken)await refreshCsrf();
    init={...init,headers:{...(init.headers||{}),'X-CSRF-Token':csrfToken||''}};
  }
  const envelope=await raw<Envelope<T>>(path,init);
  return envelope.data;
}
export async function refreshCsrf(){const result=await raw<Envelope<{csrf_token:string}>>('/auth/csrf');csrfToken=result.data.csrf_token;return csrfToken;}
export function resetCsrf(){csrfToken=undefined;}
