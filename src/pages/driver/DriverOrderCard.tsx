import type { Order } from '../../types/domain';
import { Button, Card, CardMeta, CardRow, CardTitle } from '../../components/ui';
import { formatVnd } from '../../utils/formatVnd';

export function DriverOrderCard({ order, action, actionLabel, busy = false }: {
  order: Order;
  action?: () => void;
  actionLabel?: string;
  busy?: boolean;
}) {
  return (
    <Card as="article" className="gap-3 bg-white/95 p-5">
      <CardRow>
        <CardTitle>Order {order.number}</CardTitle>
        <span className="rounded-full bg-navy-wash px-3 py-1 text-xs font-semibold text-navy">{order.status}</span>
      </CardRow>
      <CardMeta>{order.hubName} · {order.items.length} item{order.items.length === 1 ? '' : 's'} · {formatVnd(order.total)}</CardMeta>
      <div className="rounded-xl bg-sand px-3.5 py-3 text-sm text-ink">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Delivery address</span>
        {order.deliveryAddress}
      </div>
      <p className="m-0 text-sm text-muted">{order.items.map(item => `${item.quantity} × ${item.name}`).join(' · ')}</p>
      {action && actionLabel && <Button size="sm" onClick={action} disabled={busy}>{busy ? 'Updating…' : actionLabel}</Button>}
    </Card>
  );
}
