import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenLayout } from '../../components/layout';
import { Button, Card, CardMeta, CardRow, CardTitle, Modal, Pill, ProgressBar, Segmented, Skeleton, Switch } from '../../components/ui';
import { kitchenTabs } from '../../mocks/orders';
import { useAppState } from '../../state/AppState';

type Tab = (typeof kitchenTabs)[number];
const stageTone = { New: 'navy', Preparing: 'amber', Ready: 'green' } as const;
export default function KitchenOrders() {
  const navigate=useNavigate(); const {orders,paused,setPaused,transitionOrder,rejectOrder,notify}=useAppState();
  const [tab,setTab]=useState<Tab>('New'); const [rejecting,setRejecting]=useState<string|null>(null); const [pauseConfirm,setPauseConfirm]=useState<boolean|null>(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{const timer=window.setTimeout(()=>setLoading(false),220);return()=>window.clearTimeout(timer);},[]);
  const counts=useMemo(()=>kitchenTabs.reduce<Record<Tab,number>>((result,name)=>({...result,[name]:orders.filter(order=>order.stage===name).length}),{New:0,Preparing:0,Ready:0}),[orders]);
  const visibleOrders=orders.filter(order=>order.stage===tab); const active=counts.Preparing+counts.Ready; const load=Math.min(active/10,1);
  return <ScreenLayout title="Kitchen orders" width="wide" hideBack>
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-8">
      <div className="flex flex-col gap-4 lg:order-2"><Card variant="muted" as="section" aria-label="Kitchen load"><CardRow><CardTitle>Hub District 3 · Kitchen load</CardTitle><Pill tone={paused?'red':load>=.8?'amber':'green'}>{paused?'Paused':load>=.8?'Busy':'Open'}</Pill></CardRow><ProgressBar value={load} tone={load>=.8?'amber':'green'} label="Kitchen load"/><CardMeta>{active} of 10 orders in progress. New orders pause at 10.</CardMeta></Card>
        <Card variant="muted"><CardRow><div><CardTitle>Pause new orders</CardTitle><CardMeta>Temporarily stop incoming orders for this hub.</CardMeta></div><Switch label="Pause new orders" checked={paused} onChange={value=>setPauseConfirm(value)}/></CardRow></Card></div>
      <div className="flex flex-col gap-4 lg:order-1"><Segmented compact label="Order stage" options={kitchenTabs} value={tab} onChange={setTab}/><p className="m-0 text-sm text-muted" aria-live="polite">{counts[tab]} {tab.toLowerCase()} {counts[tab]===1?'order':'orders'}</p>
        {loading?<div className="grid grid-cols-1 gap-3 md:grid-cols-2" aria-label="Loading orders">{[0,1,2,3].map(item=><Skeleton key={item} className="h-48 rounded-card" />)}</div>:visibleOrders.length===0?<div className="rounded-card border border-dashed border-line bg-white p-10 text-center"><h2 className="m-0 font-display text-lg">No {tab.toLowerCase()} orders right now</h2><p className="mb-0 mt-2 text-sm text-muted">New orders will appear here automatically.</p></div>:<ul className="m-0 grid grid-cols-1 list-none gap-3 p-0 md:grid-cols-2">{visibleOrders.map(order=><li key={order.id}><Card as="article" className="h-full"><CardRow><CardTitle>{order.id}</CardTitle><Pill tone={stageTone[order.stage]}>{order.stage}</Pill></CardRow><p className="m-0 text-[15px]">{order.items}</p><CardMeta>{order.meta}</CardMeta><div className="mt-auto grid grid-cols-2 gap-2.5 pt-2">{order.stage==='New'?<><Button variant="dangerOutline" size="sm" onClick={()=>setRejecting(order.id)}>Reject</Button><Button size="sm" disabled={paused} onClick={()=>transitionOrder(order.id,'Preparing')}>Confirm order</Button></>:order.stage==='Preparing'?<><Button variant="outline" size="sm" onClick={()=>navigate('/restaurant/kitchen-prepare')}>Order details</Button><Button size="sm" onClick={()=>transitionOrder(order.id,'Ready')}>Mark ready</Button></>:<><Button variant="outline" size="sm" onClick={()=>navigate('/restaurant/shipper-deliveries')}>Delivery details</Button><Button size="sm" onClick={()=>notify(`${order.id} is ready for pickup`)}>Notify shipper</Button></>}</div></Card></li>)}</ul>}
      </div>
    </div>
    <Modal open={pauseConfirm!==null} onClose={()=>setPauseConfirm(null)} title={pauseConfirm?'Pause new orders?':'Resume new orders?'} description={pauseConfirm?'The hub will stop receiving new orders until you resume service.':'The hub will start receiving new orders again.'}><div className="grid w-full grid-cols-2 gap-3"><Button variant="outline" size="sm" onClick={()=>setPauseConfirm(null)}>Cancel</Button><Button size="sm" onClick={()=>{if(pauseConfirm!==null)setPaused(pauseConfirm);setPauseConfirm(null);}}>{pauseConfirm?'Pause orders':'Resume orders'}</Button></div></Modal>
    <Modal open={rejecting!==null} onClose={()=>setRejecting(null)} title="Reject this order?" description="Choose a reason. The customer will be notified and refunded."><div className="grid w-full gap-2">{['Item out of stock','Kitchen too busy','Other reason'].map(reason=><Button key={reason} variant="outline" size="sm" onClick={()=>{if(rejecting)rejectOrder(rejecting,reason);setRejecting(null);notify(`Reason: ${reason}`);}}>{reason}</Button>)}<Button variant="outline" size="sm" onClick={()=>setRejecting(null)}>Cancel</Button></div></Modal>
  </ScreenLayout>;
}
