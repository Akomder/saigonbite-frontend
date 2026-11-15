import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScreenLayout, Split } from '../../components/layout';
import { Button, Card, CardTitle, ChipRow, DescriptionList, ItemRow, KeyValue, Pill } from '../../components/ui';
import { hubMenu, menuFilters } from '../../data/menu';
import type { MenuItem } from '../../types';
import { formatVnd } from '../../utils/formatVnd';

type Filter = (typeof menuFilters)[number];

export default function HubMenu() {
  const [filter, setFilter] = useState<Filter>('All');
  const [cart, setCart] = useState<Record<string, number>>({ phoBoTai: 2 });

  const visibleItems = useMemo(
    () => hubMenu.filter((item) => filter === 'All' || item.category === filter),
    [filter]
  );

  const addItem = (item: MenuItem) => setCart((current) => ({ ...current, [item.id]: (current[item.id] ?? 0) + 1 }));
  const clearCart = () => setCart({});

  const lines = hubMenu.filter((item) => cart[item.id]);
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
          to="/customer/checkout"
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
        <Link
          to="/customer/checkout"
          className="sticky bottom-0 z-20 mx-gutter mb-4 flex min-h-control items-center justify-between rounded-control bg-navy px-5 text-base font-medium text-white shadow-lg transition-colors hover:bg-blue lg:hidden"
        >
          <span>
            {count} {count === 1 ? 'item' : 'items'} · View order
          </span>
          <strong>{formatVnd(subtotal)}</strong>
        </Link>
      }
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <Pill tone="green">Quiet</Pill>
        <span className="text-sm text-muted">~25 min · 3.1 km</span>
      </div>
      <Split
        primary={
          <>
            <ChipRow label="Menu categories" items={menuFilters} value={filter} onChange={setFilter} />
            <ul className="m-0 grid grid-cols-1 list-none gap-3 p-0 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {visibleItems.map((item) => (
                <ItemRow key={item.id} item={item} quantity={cart[item.id] ?? 0} onAdd={addItem} />
              ))}
            </ul>
          </>
        }
        secondary={<div className="hidden lg:block">{summary}</div>}
        sticky
      />
    </ScreenLayout>
  );
}
