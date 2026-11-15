import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ScreenLayout, Split } from '../../components/layout';
import { Button, Card, CardTitle, Drawer, ErrorBanner, ItemRow, Pill, Skeleton } from '../../components/ui';
import { formatVnd } from '../../utils/formatVnd';
import { useAppState } from '../../state/AppState';
import { hubService, type HubMenuResult } from '../../services/hubService';

const tone = { quiet: 'green', normal: 'navy', busy: 'amber', full: 'red' } as const;

export default function HubMenu() {
  const { hubId = '' } = useParams();
  const numericHubId = Number(hubId);
  const [menuData, setMenuData] = useState<HubMenuResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, addToCart, decrementCart, clearCart, setSelectedHubId } = useAppState();

  useEffect(() => {
    let live = true;
    setSelectedHubId(numericHubId);
    hubService.getMenu(numericHubId).then(data => { if (live) setMenuData(data); })
      .catch(e => { if (live) setError(e instanceof Error ? e.message : 'Menu could not be loaded.'); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [numericHubId, setSelectedHubId]);

  const items = menuData?.items || [];
  const lines = useMemo(() => items.filter(item => (cart[String(item.id)] || 0) > 0), [items, cart]);
  const count = lines.reduce((sum, item) => sum + (cart[String(item.id)] || 0), 0);
  const subtotal = lines.reduce((sum, item) => sum + item.price * (cart[String(item.id)] || 0), 0);

  const summary = (
    <Card as="section" aria-label="Your order" className="glass-panel gap-4 p-5">
      <div className="flex items-start justify-between gap-3"><div><p className="m-0 text-xs font-semibold uppercase tracking-[.14em] text-muted">Your order</p><CardTitle className="mt-1">{menuData?.hub.name || 'Current hub'}</CardTitle></div>{menuData?.hub && <Pill tone={tone[menuData.hub.status]}>{menuData.hub.acceptingOrders ? menuData.hub.status : 'Paused'}</Pill>}</div>
      {lines.length ? <div className="divide-y divide-line/70">{lines.map(item => <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
        <div className="min-w-0 flex-1"><p className="m-0 truncate text-sm font-semibold text-ink">{item.name}</p><p className="m-0 mt-1 text-xs text-muted">{formatVnd(item.price)} each</p></div>
        <div className="flex items-center gap-2"><button type="button" aria-label={`Remove one ${item.name}`} onClick={() => decrementCart(item.id)} className="grid size-8 place-items-center rounded-full border border-line bg-white/90 text-ink transition active:scale-95">−</button><span className="w-5 text-center text-sm font-semibold tabular-nums">{cart[String(item.id)]}</span><button type="button" aria-label={`Add one ${item.name}`} onClick={() => addToCart(item.id)} className="grid size-8 place-items-center rounded-full bg-navy text-white transition active:scale-95">+</button></div>
        <strong className="w-[76px] text-right text-xs tabular-nums">{formatVnd(item.price * (cart[String(item.id)] || 0))}</strong>
      </div>)}</div> : <p className="m-0 rounded-xl bg-white/85 p-4 text-sm text-muted">Your cart is empty. Add an item to get started.</p>}
      <div className="border-t border-white/80 pt-3"><div className="flex items-center justify-between text-sm"><span className="text-muted">Subtotal</span><strong className="text-base tabular-nums">{formatVnd(subtotal)}</strong></div><p className="mb-0 mt-2 text-xs leading-5 text-muted">Delivery availability and fees are confirmed at checkout.</p></div>
      <Link to="/checkout" aria-disabled={!count} className={`inline-flex min-h-12 items-center justify-center rounded-control bg-navy px-5 font-semibold text-white transition hover:bg-blue active:scale-[0.98] ${count ? '' : 'pointer-events-none opacity-50'}`}>Continue to checkout</Link>
      {count > 0 && <Button variant="outline" size="sm" onClick={clearCart}>Clear cart</Button>}
    </Card>
  );

  return (
    <ScreenLayout title={menuData?.hub.name || 'Hub menu'} width="wide" footer={count > 0 ? <button type="button" onClick={() => setCartOpen(true)} className="glass-nav fixed inset-x-3 bottom-24 z-20 mx-auto flex min-h-14 max-w-md items-center justify-between px-5 text-ink shadow-lg lg:hidden"><span>{count} {count === 1 ? 'item' : 'items'} · View order</span><strong>{formatVnd(subtotal)}</strong></button> : null}>
      {error && <ErrorBanner>{error}</ErrorBanner>}
      {menuData && <div className="flex flex-wrap items-center gap-2"><Pill tone={tone[menuData.hub.status]}>{menuData.hub.acceptingOrders ? menuData.hub.status : 'Paused'}</Pill><span className="text-sm text-muted">{menuData.hub.activeOrders} of {menuData.hub.capacity} active orders</span></div>}
      {loading && <Skeleton className="h-24"/>}
      <Split primary={<><ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">{items.map(item => <ItemRow key={item.id} item={item} quantity={cart[String(item.id)] || 0} onAdd={value => addToCart(value.id)} onRemove={value => decrementCart(value.id)}/>)}</ul>{!loading && items.length === 0 && <p className="rounded-card bg-white p-8 text-center text-muted">No menu items are available at this hub.</p>}</>} secondary={<div className="hidden lg:block">{summary}</div>} sticky/>
      <Drawer open={cartOpen} onClose={() => setCartOpen(false)} title="Your cart"><div className="mb-4 flex items-center justify-between"><h2 className="m-0 font-display text-xl font-semibold">Your order</h2><button type="button" onClick={() => setCartOpen(false)}>Close</button></div><Card>{lines.map(item => <div key={item.id} className="flex items-center justify-between gap-2 border-b border-line py-3"><span className="min-w-0 flex-1 text-sm">{item.name}<small className="block text-muted">{formatVnd(item.price * (cart[String(item.id)] || 0))}</small></span><button type="button" aria-label={`Remove one ${item.name}`} onClick={() => decrementCart(item.id)} className="grid size-8 place-items-center rounded-full border border-line">−</button><span className="w-6 text-center">{cart[String(item.id)]}</span><button type="button" aria-label={`Add one ${item.name}`} onClick={() => addToCart(item.id)} className="grid size-8 place-items-center rounded-full bg-navy text-white">+</button></div>)}<div className="mt-3 flex justify-between font-semibold"><span>Subtotal</span><span>{formatVnd(subtotal)}</span></div></Card><Link to="/checkout" onClick={() => setCartOpen(false)} className={`mt-4 inline-flex min-h-control w-full items-center justify-center rounded-control bg-navy px-5 font-semibold text-white ${count ? '' : 'pointer-events-none opacity-50'}`}>Continue to checkout</Link></Drawer>
    </ScreenLayout>
  );
}
