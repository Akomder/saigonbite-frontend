import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ScreenLayout, Split } from '../../components/layout';
import { Button, Card, CardTitle, ChipRow, DescriptionList, Drawer, ItemRow, KeyValue, Pill } from '../../components/ui';
import { hubMenu, menuFilters } from '../../mocks/menu';
import { formatVnd } from '../../utils/formatVnd';
import { useAppState } from '../../state/AppState';
import { hubService } from '../../services/hubService';
import type { MenuItem } from '../../types/domain';

type Filter = (typeof menuFilters)[number];

export default function HubMenu() {
  const [filter, setFilter] = useState<Filter>('All');
  const [cartOpen,setCartOpen]=useState(false);
  const [menu,setMenu]=useState<MenuItem[]>(hubMenu);const [loading,setLoading]=useState(true);const [loadError,setLoadError]=useState('');const {hubId='district3'}=useParams();
  const { cart, addToCart, decrementCart, clearCart } = useAppState();
  useEffect(()=>{let active=true;hubService.getMenu(hubId).then(items=>{if(active)setMenu(items);}).catch(()=>{if(active)setLoadError('Menu unavailable. Try again in a moment.');}).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[hubId]);

  const visibleItems = useMemo(
    () => menu.filter((item) => filter === 'All' || item.category === filter),
    [filter,menu]
  );


  const lines = menu.filter((item) => cart[item.id]);
  const count = lines.reduce((total, item) => total + cart[item.id], 0);
  const subtotal = lines.reduce((total, item) => total + item.price * cart[item.id], 0);

  const summary = (
    <Card as="section" aria-label="Your order">
      <CardTitle>Your order</CardTitle>
      {lines.length > 0 ? (
        <DescriptionList>
          {lines.map((item) => (
            <KeyValue key={item.id} label={`${cart[item.id]} × ${item.name}`} value={formatVnd(item.price * cart[item.id])} />
          ))}
          <KeyValue label="Subtotal" value={formatVnd(subtotal)} strong />
        </DescriptionList>
      ) : (
        <p className="m-0 text-sm text-muted">Your order is empty. Add something from the menu.</p>
      )}
      <div className="mt-1 flex flex-col gap-2">
        <Link
          to="/checkout"
          aria-disabled={count === 0}
          className="inline-flex min-h-control items-center justify-center rounded-control bg-navy px-5 text-[17px] font-semibold text-white transition-colors hover:bg-blue aria-disabled:pointer-events-none aria-disabled:opacity-50"
        >
          View order
        </Link>
        {count > 0 ? (
          <Button variant="outline" size="sm" onClick={clearCart}>
            Clear order
          </Button>
        ) : null}
      </div>
    </Card>
  );

  return (
    <ScreenLayout
      title="Hub District 3"
      width="wide"
      footer={
        <button type="button" onClick={()=>setCartOpen(true)} className="sticky bottom-0 z-20 mx-gutter mb-4 flex min-h-control items-center justify-between rounded-control bg-navy px-5 text-base font-medium text-white shadow-lg transition-colors hover:bg-blue lg:hidden">
          <span>
            {count} {count === 1 ? 'item' : 'items'} · View order
          </span>
          <strong>{formatVnd(subtotal)}</strong>
        </button>
      }
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <Pill tone="green">Quiet</Pill>
        <span className="text-sm text-muted">~25 min · 3.1 km</span>
      </div>
      {loadError&&<p role="alert" className="rounded-xl bg-danger-wash px-4 py-3 text-sm text-danger">{loadError}</p>}{loading&&<p role="status" className="text-sm text-muted">Loading menu…</p>}
      <Split
        primary={
          <>
            <ChipRow label="Menu categories" items={menuFilters} value={filter} onChange={setFilter} />
            <ul className="m-0 grid grid-cols-1 list-none gap-3 p-0 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {visibleItems.map((item) => (
                <ItemRow key={item.id} item={item} quantity={cart[item.id] ?? 0} onAdd={(menuItem) => addToCart(menuItem.id)} onRemove={(menuItem) => decrementCart(menuItem.id)} />
              ))}
            </ul>
          </>
        }
        secondary={<div className="hidden lg:block">{summary}</div>}
        sticky
      />
      <Drawer open={cartOpen} onClose={()=>setCartOpen(false)} title="Your cart"><div className="mb-4 flex items-center justify-between"><h2 className="m-0 font-display text-xl font-semibold">Your order</h2><button type="button" className="rounded-full px-3 py-2 text-sm text-muted" onClick={()=>setCartOpen(false)}>Close</button></div><Card>{lines.length?lines.map(item=><div key={item.id} className="flex items-center justify-between gap-2 border-b border-line py-3"><span className="min-w-0 flex-1 text-sm font-medium">{item.name}<small className="block text-muted">{formatVnd(item.price*cart[item.id])}</small></span><button type="button" aria-label={`Remove one ${item.name}`} className="grid size-8 place-items-center rounded-full border border-line" onClick={()=>decrementCart(item.id)}>−</button><span className="w-6 text-center">{cart[item.id]}</span><button type="button" aria-label={`Add one ${item.name}`} className="grid size-8 place-items-center rounded-full bg-navy text-white" onClick={()=>addToCart(item.id)}>+</button></div>):<p className="m-0 py-4 text-sm text-muted">Your order is empty. Add something from the menu.</p>}<div className="mt-3 flex justify-between font-semibold"><span>Subtotal</span><span>{formatVnd(subtotal)}</span></div></Card><div className="mt-4 grid gap-2"><Link to="/checkout" onClick={()=>setCartOpen(false)} className={`inline-flex min-h-control items-center justify-center rounded-control bg-navy px-5 font-semibold text-white ${count===0?'pointer-events-none opacity-50':''}`}>Continue to checkout</Link><Button variant="outline" size="sm" onClick={clearCart} disabled={count===0}>Clear cart</Button></div></Drawer>
    </ScreenLayout>
  );
}
