import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScreenLayout } from '../../components/layout';
import { Button, ErrorBanner, Skeleton } from '../../components/ui';
import { driverService } from '../../services/driverService';
import { useAppState } from '../../state/AppState';
import type { Order } from '../../types/domain';
import { DriverOrderCard } from './DriverOrderCard';

export default function AvailablePickups() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const { notify } = useAppState();
  const refresh = useCallback(async () => {
    setError('');
    try { setOrders(await driverService.getAvailable()); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Pickups could not be loaded.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  async function accept(id: number) {
    setBusyId(id);
    setError('');
    try {
      await driverService.accept(id);
      setOrders(current => current.filter(order => order.id !== id));
      notify('Pickup accepted. Continue in Active Delivery.');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Pickup could not be accepted.');
      void refresh();
    } finally { setBusyId(null); }
  }

  return (
    <ScreenLayout title="Available pickups" width="wide" hideBack>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <p className="m-0 max-w-xl text-sm text-muted">Choose a ready order to claim. Claimed pickups are reserved to your driver account.</p>
        <Button size="sm" variant="outline" className="w-auto" onClick={() => { setLoading(true); void refresh(); }}>Refresh</Button>
      </div>
      {error && <ErrorBanner>{error}</ErrorBanner>}
      {loading ? <div className="grid gap-3 md:grid-cols-2">{[0, 1].map(item => <Skeleton key={item} className="h-48" />)}</div>
        : orders.length ? <ul className="grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
          {orders.map(order => <li key={order.id}><DriverOrderCard order={order} busy={busyId === order.id} actionLabel="Accept pickup" action={() => void accept(order.id)} /></li>)}
        </ul>
        : <div className="rounded-card border border-dashed border-line bg-white/80 p-8 text-center">
          <h2 className="m-0 font-display text-lg font-semibold text-ink">No ready pickups right now</h2>
          <p className="mb-4 mt-2 text-sm text-muted">New orders that are ready for collection will appear here.</p>
          <Link to="/driver/active" className="font-semibold text-navy">View active deliveries</Link>
        </div>}
    </ScreenLayout>
  );
}
