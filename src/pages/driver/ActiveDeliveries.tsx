import { useCallback, useEffect, useState } from 'react';
import { ScreenLayout } from '../../components/layout';
import { ErrorBanner, Skeleton } from '../../components/ui';
import { driverService } from '../../services/driverService';
import { useAppState } from '../../state/AppState';
import type { Order } from '../../types/domain';
import { DriverOrderCard } from './DriverOrderCard';

export default function ActiveDeliveries() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const { notify } = useAppState();
  const refresh = useCallback(async () => {
    setError('');
    try { setOrders(await driverService.getActive()); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Active deliveries could not be loaded.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  async function progress(order: Order) {
    setBusyId(order.id);
    setError('');
    try {
      if (order.status === 'Ready') {
        const updated = await driverService.pickup(order.id);
        setOrders(current => current.map(item => item.id === updated.id ? updated : item));
        notify(`Order ${updated.number} is out for delivery.`);
      } else {
        const updated = await driverService.complete(order.id);
        setOrders(current => current.filter(item => item.id !== updated.id));
        notify(`Order ${updated.number} delivered.`);
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Delivery status could not be updated.');
      void refresh();
    } finally { setBusyId(null); }
  }

  return (
    <ScreenLayout title="Active delivery" width="wide" hideBack>
      {error && <ErrorBanner>{error}</ErrorBanner>}
      {loading ? <div className="grid gap-3 md:grid-cols-2">{[0, 1].map(item => <Skeleton key={item} className="h-48" />)}</div>
        : orders.length ? <ul className="grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
          {orders.map(order => <li key={order.id}><DriverOrderCard order={order} busy={busyId === order.id} actionLabel={order.status === 'Ready' ? 'Confirm pickup · start delivery' : 'Mark as delivered'} action={() => void progress(order)} /></li>)}
        </ul>
        : <div className="rounded-card border border-dashed border-line bg-white/80 p-8 text-center">
          <h2 className="m-0 font-display text-lg font-semibold text-ink">No active deliveries</h2>
          <p className="mb-0 mt-2 text-sm text-muted">Accept a pickup to see its address and delivery actions here.</p>
        </div>}
    </ScreenLayout>
  );
}
