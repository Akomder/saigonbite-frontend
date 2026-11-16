import { useCallback, useEffect, useState } from 'react';
import { ScreenLayout } from '../../components/layout';
import { ErrorBanner, Skeleton } from '../../components/ui';
import { driverService } from '../../services/driverService';
import type { Order } from '../../types/domain';
import { DriverOrderCard } from './DriverOrderCard';

export default function DeliveryHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setError('');
    try { setOrders(await driverService.getHistory()); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Delivery history could not be loaded.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  return (
    <ScreenLayout title="Delivery history" width="wide" hideBack>
      {error && <ErrorBanner>{error}</ErrorBanner>}
      {loading ? <div className="grid gap-3 md:grid-cols-2">{[0, 1].map(item => <Skeleton key={item} className="h-48" />)}</div>
        : orders.length ? <ul className="grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
          {orders.map(order => <li key={order.id}><DriverOrderCard order={order} /></li>)}
        </ul>
        : <div className="rounded-card border border-dashed border-line bg-white/80 p-8 text-center">
          <h2 className="m-0 font-display text-lg font-semibold text-ink">No completed deliveries yet</h2>
          <p className="mb-0 mt-2 text-sm text-muted">Completed orders will appear here for your records.</p>
        </div>}
    </ScreenLayout>
  );
}
