import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ScreenLayout } from '../../components/layout';
import { Button, Card, CardMeta, CardRow, CardTitle, ErrorBanner, Modal, Pill, ProgressBar, Segmented, Skeleton, Switch } from '../../components/ui';
import { useAppState } from '../../state/AppState';
import type { KitchenOrder } from '../../types/domain';

const tabs = ['New', 'Preparing', 'Ready'] as const;
type Tab = (typeof tabs)[number];
const stageTone = { New: 'navy', Preparing: 'navy', Ready: 'green' } as const;

function OrderTicket({ order, paused, onAdvance, onReject }: { order: KitchenOrder; paused: boolean; onAdvance: (order: KitchenOrder) => void; onReject: (id: number) => void }) {
  return <Card as="article" className="glass-interactive gap-2 rounded-[16px] border border-line bg-white/95 px-4 py-3.5 shadow-sm hover:shadow-md">
    <CardRow><CardTitle>{order.number}</CardTitle><Pill tone={stageTone[order.stage]}>{order.stage}</Pill></CardRow>
    <p className="m-0 text-[15px] leading-5 text-ink">{order.items}</p>
    <CardMeta className="text-[12px]">{order.meta}</CardMeta>
    <div className="mt-1 grid grid-cols-2 gap-2.5">
      {order.stage === 'New' ? <><Button variant="dangerOutline" size="sm" onClick={() => onReject(order.id)}>Reject</Button><Button size="sm" disabled={paused} onClick={() => onAdvance(order)}>Confirm</Button></> : order.stage === 'Preparing' ? <><span/><Button size="sm" onClick={() => onAdvance(order)}>Mark ready</Button></> : <span className="col-span-2 text-sm font-medium text-success">Ready for pickup</span>}
    </div>
  </Card>;
}

export default function KitchenOrders() {
  const location = useLocation();
  const search = ((location.state as { search?: string } | null)?.search || '').trim().toLocaleLowerCase();
  const { orders, hub, paused, setPaused, transitionOrder, rejectOrder, refreshKitchen } = useAppState();
  const [tab, setTab] = useState<Tab>('New');
  const [rejecting, setRejecting] = useState<number | null>(null);
  const [pauseConfirm, setPauseConfirm] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let live = true;
    refreshKitchen().catch(e => { if (live) setError(e instanceof Error ? e.message : 'Kitchen orders could not load.'); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [refreshKitchen]);

  const visibleOrders = useMemo(() => search ? orders.filter(order => [order.number, order.items, order.meta].join(" ").toLocaleLowerCase().includes(search)) : orders, [orders, search]);
  const counts = useMemo(() => tabs.reduce<Record<Tab, number>>((out, name) => ({ ...out, [name]: visibleOrders.filter(order => order.stage === name).length }), { New: 0, Preparing: 0, Ready: 0 }), [visibleOrders]);
  const load = hub ? Math.min(hub.loadRatio, 1) : 0;
  async function advance(order: KitchenOrder) {
    if (order.stage === 'New') return updateStatus(order.id, 'Preparing');
    if (order.stage === 'Preparing') return updateStatus(order.id, 'Ready');
  }
  async function updateStatus(id: number, stage: 'Preparing' | 'Ready') {
    setError('');
    try { await transitionOrder(id, stage); } catch (e) { setError(e instanceof Error ? e.message : 'Order update failed.'); }
  }
  async function reject(id: number, reason: string) {
    setError('');
    try { await rejectOrder(id, reason); setRejecting(null); } catch (e) { setError(e instanceof Error ? e.message : 'Order rejection failed.'); }
  }
  async function pause(value: boolean) {
    setError('');
    try { await setPaused(value); setPauseConfirm(null); } catch (e) { setError(e instanceof Error ? e.message : 'Could not update hub settings.'); }
  }
  const openReject = (id: number) => setRejecting(id);
  const loadCard = <Card variant="muted" as="section" aria-label="Kitchen load" className="gap-3 rounded-[18px] px-4 py-4 lg:p-5">
    <CardRow><div><p className="m-0 text-xs font-semibold uppercase tracking-[.14em] text-muted">Kitchen telemetry</p><CardTitle className="mt-1 text-base">{hub?.name || 'Kitchen'} · Load</CardTitle></div><Pill tone={paused ? 'red' : load >= .8 ? 'amber' : 'green'}>{paused ? 'Paused' : hub?.status || 'Loading'}</Pill></CardRow>
    <ProgressBar value={load} tone="amber" label="Kitchen load" />
    <div className="flex flex-wrap items-center justify-between gap-2"><CardMeta className="text-[12px]">{hub?.activeOrders ?? 0} of {hub?.capacity ?? 0} orders in progress · pause at {hub?.capacity ?? 10}</CardMeta><span className="rounded-full bg-white/75 px-3 py-1.5 text-xs font-semibold text-navy">{counts.Preparing} in prep</span></div>
  </Card>;

  return <ScreenLayout title="Incoming orders" width="wide">
    <div className="flex flex-col gap-5">
      {error && <ErrorBanner>{error}</ErrorBanner>}
      <div className="hidden items-stretch gap-4 lg:flex">
        <div className="glass-panel min-w-0 flex-1 p-5">{loadCard}</div>
        <div className="glass-panel flex min-w-[270px] items-center justify-between gap-4 p-5"><div><p className="m-0 text-xs font-semibold uppercase tracking-[.14em] text-muted">Order intake</p><p className="mb-0 mt-1 font-semibold text-ink">Pause new orders</p></div><Switch label="Accept new orders" checked={!paused} onChange={accepting => setPauseConfirm(!accepting)} /></div>
      </div>
      <div className="hidden grid-cols-3 gap-5 lg:grid">
        {tabs.map(stage => <section key={stage} aria-label={`${stage} orders`} className="min-w-0 rounded-[22px] border border-white/80 bg-white/45 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.8)]">
          <div className="mb-4 flex items-center justify-between gap-2"><h2 className="m-0 font-display text-lg font-semibold">{stage === 'Ready' ? 'Ready for pickup' : `${stage} orders`}</h2><Pill tone={stageTone[stage]}>{counts[stage]}</Pill></div>
          {loading ? <div className="grid gap-3"><Skeleton className="h-40"/><Skeleton className="h-40"/></div> : visibleOrders.filter(order => order.stage === stage).length ? <div className="grid gap-3">{visibleOrders.filter(order => order.stage === stage).map(order => <OrderTicket key={order.id} order={order} paused={paused} onAdvance={advance} onReject={openReject}/>)}</div> : <div className="rounded-2xl border border-dashed border-line bg-white/80 p-6 text-center"><p className="m-0 text-sm font-medium text-ink">No {stage.toLowerCase()} orders</p><p className="mb-0 mt-1 text-xs text-muted">New tickets will appear here.</p></div>}
        </section>)}
      </div>
      <div className="mx-auto flex w-full max-w-[38rem] flex-col gap-4 lg:hidden">
        {loadCard}
        <Segmented compact label="Order stage" options={tabs.map(stage => `${stage} (${counts[stage]})`)} value={`${tab} (${counts[tab]})`} onChange={value => setTab(value.split(' (')[0] as Tab)} />
        {loading ? <div className="grid gap-3"><Skeleton className="h-48"/><Skeleton className="h-48"/></div> : visibleOrders.filter(order => order.stage === tab).length === 0 ? <div className="rounded-[16px] border border-dashed border-line bg-white/95 p-8 text-center"><h2 className="m-0 font-display text-lg">No {tab.toLowerCase()} orders right now</h2><p className="mb-0 mt-2 text-sm text-muted">The list is loaded from your assigned hub.</p></div> : <div className="grid gap-3">{visibleOrders.filter(order => order.stage === tab).map(order => <OrderTicket key={order.id} order={order} paused={paused} onAdvance={advance} onReject={openReject}/>)}</div>}
        <div className="glass-panel flex items-center justify-between gap-4 rounded-[18px] p-4"><div><p className="m-0 text-sm font-semibold text-ink">Pause new orders</p><p className="mb-0 mt-1 text-xs text-muted">{paused ? 'Hub is paused' : 'Accepting customer orders'}</p></div><Switch label="Accept new orders" checked={!paused} onChange={accepting => setPauseConfirm(!accepting)} /></div>
      </div>
    </div>
    <Modal open={pauseConfirm !== null} onClose={() => setPauseConfirm(null)} title={pauseConfirm ? 'Pause new orders?' : 'Resume new orders?'} description={pauseConfirm ? 'Customers will not be able to place new orders at this hub.' : 'The hub will start accepting orders again.'}>
      <div className="grid w-full grid-cols-2 gap-3"><Button variant="outline" size="sm" onClick={() => setPauseConfirm(null)}>Cancel</Button><Button size="sm" onClick={() => pause(Boolean(pauseConfirm))}>{pauseConfirm ? 'Pause hub' : 'Resume hub'}</Button></div>
    </Modal>
    <Modal open={rejecting !== null} onClose={() => setRejecting(null)} title="Reject this order?" description="Choose a reason for rejecting the order.">
      <div className="grid w-full gap-2">{['Item out of stock', 'Kitchen too busy', 'Other reason'].map(reason => <Button key={reason} variant="outline" size="sm" onClick={() => rejecting !== null && reject(rejecting, reason)}>{reason}</Button>)}<Button variant="outline" size="sm" onClick={() => setRejecting(null)}>Cancel</Button></div>
    </Modal>
  </ScreenLayout>;
}
