import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { kitchenOrders as seedOrders, type KitchenOrder } from '../mocks/orders';
import { kitchenService } from '../services/kitchenService';
import { mocksEnabled } from '../services/api';

interface AppStateValue { orders: KitchenOrder[]; paused: boolean; toast: string; cart: Record<string, number>; addToCart: (id: string) => void; decrementCart: (id: string) => void; clearCart: () => void; transitionOrder: (id: string, stage: KitchenOrder['stage']) => void; rejectOrder: (id: string,reason?:string) => void; setPaused: (paused: boolean) => void; notify: (message: string) => void; }
const AppState = createContext<AppStateValue | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<KitchenOrder[]>(() => { try { const saved = localStorage.getItem('saigonbite.orders'); return saved ? JSON.parse(saved) as KitchenOrder[] : seedOrders; } catch { return seedOrders; } });
  const [paused, setPausedState] = useState(() => localStorage.getItem('saigonbite.paused') === 'true');
  const [toast, setToast] = useState('');
  const [cart,setCart]=useState<Record<string,number>>(()=>{try{return JSON.parse(localStorage.getItem('saigonbite.cart')||'{}') as Record<string,number>;}catch{return {};}});
  const notify = useCallback((message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2800); }, []);
  useEffect(()=>{if(mocksEnabled())return;let active=true;kitchenService.getKitchenOrders().then(rows=>{if(active)setOrders(rows.filter(order=>order.stage==='New'||order.stage==='Preparing'||order.stage==='Ready').map(order=>({...order,stage:order.stage as KitchenOrder['stage']})));}).catch(()=>{if(active)notify('Kitchen orders could not be refreshed.');});return()=>{active=false;};},[notify]);
  const transitionOrder = useCallback((id: string, stage: KitchenOrder['stage']) => { setOrders(current => { const next=current.map(order=>order.id===id?{...order,stage}:order); localStorage.setItem('saigonbite.orders',JSON.stringify(next)); return next; }); if(!mocksEnabled())void kitchenService.updateOrderStatus(id,stage).catch(()=>notify(`Could not update ${id}. Try again.`)); notify(`${id} moved to ${stage.toLowerCase()}`); }, [notify]);
  const rejectOrder = useCallback((id: string,reason='Other reason') => { setOrders(current=>{const next=current.filter(order=>order.id!==id);localStorage.setItem('saigonbite.orders',JSON.stringify(next));return next;});if(!mocksEnabled())void kitchenService.rejectOrder(id,reason).catch(()=>notify(`Could not reject ${id}. Try again.`));notify(`${id} rejected`); }, [notify]);
  const setPaused = useCallback((value: boolean) => { setPausedState(value); localStorage.setItem('saigonbite.paused',String(value)); if(!mocksEnabled())void kitchenService.toggleHubPause('district3',value).catch(()=>notify('Could not update hub availability.')); notify(value?'New orders paused':'New orders resumed'); },[notify]);
  const addToCart=useCallback((id:string)=>{setCart(current=>{const next={...current,[id]:(current[id]||0)+1};localStorage.setItem('saigonbite.cart',JSON.stringify(next));return next;});notify('Added to your order');},[notify]);
  const decrementCart=useCallback((id:string)=>{setCart(current=>{const quantity=(current[id]||0)-1;const next={...current};if(quantity>0)next[id]=quantity;else delete next[id];localStorage.setItem('saigonbite.cart',JSON.stringify(next));return next;});},[]);
  const clearCart=useCallback(()=>{setCart({});localStorage.removeItem('saigonbite.cart');},[]);
  const value=useMemo(()=>({orders,paused,toast,cart,addToCart,decrementCart,clearCart,transitionOrder,rejectOrder,setPaused,notify}),[orders,paused,toast,cart,addToCart,decrementCart,clearCart,transitionOrder,rejectOrder,setPaused,notify]);
  return <AppState.Provider value={value}>{children}{toast&&<div role="status" aria-live="polite" className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-lg md:bottom-6">{toast}</div>}</AppState.Provider>;
}
export function useAppState() { const value=useContext(AppState); if(!value) throw new Error('useAppState must be used within AppProvider'); return value; }
