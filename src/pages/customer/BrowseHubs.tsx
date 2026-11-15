import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScreenLayout } from '../../components/layout';
import { Card, CardMeta, CardRow, CardTitle, ChipRow, ErrorBanner, Pill, Skeleton } from '../../components/ui';
import { hubService } from '../../services/hubService';
import type { Hub } from '../../types/domain';

const filters = ['All', 'Quiet', 'Normal', 'Busy', 'Full'] as const;
type Filter = (typeof filters)[number];
const tone = { quiet: 'green', normal: 'navy', busy: 'amber', full: 'red' } as const;

export default function BrowseHubs() {
  const [filter, setFilter] = useState<Filter>('All');
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    hubService.getHubs().then(data => { if (active) setHubs(data); })
      .catch(e => { if (active) setError(e instanceof Error ? e.message : 'Hubs could not be loaded.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const visible = useMemo(() => hubs.filter(hub => filter === 'All' || hub.status.toLowerCase() === filter.toLowerCase()), [hubs, filter]);
  const quietHub = hubs.find(hub => hub.status.toLowerCase() === 'quiet' && hub.acceptingOrders);

  return (
    <ScreenLayout title="Choose a hub" width="wide">
      <ChipRow label="Hub availability" items={filters} value={filter} onChange={setFilter} />
      {quietHub && <p className="m-0 rounded-[12px] bg-tint px-[14px] py-3 text-[13px] font-medium leading-5 text-navy">{quietHub.name} is quiet right now. Order there for faster cooking.</p>}
      {error && <ErrorBanner>{error}</ErrorBanner>}
      {loading ? <div className="grid gap-3 md:grid-cols-2"><Skeleton className="h-36"/><Skeleton className="h-36"/></div> : visible.length === 0 ? <p className="rounded-card bg-white p-8 text-center text-muted">No hubs match this filter.</p> :
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2 lg:gap-5">{visible.map(hub => <li key={hub.id}>
          <Card as="article" variant={!hub.acceptingOrders ? 'disabled' : 'outline'} className="min-h-[158px] gap-1.5 rounded-[16px] px-4 py-3.5">
            <CardRow><CardTitle className="text-[17px]">{hub.name}</CardTitle><Pill tone={tone[hub.status]}>{hub.acceptingOrders ? hub.status : 'Paused'}</Pill></CardRow>
            <CardMeta className="text-[13px]">{hub.address}</CardMeta>
            <CardMeta className="text-[12px]">{hub.activeOrders} of {hub.capacity} active orders · {Math.round(hub.loadRatio * 100)}% load</CardMeta>
            {hub.acceptingOrders ? <Link to={`/hubs/${hub.id}`} className="mt-2 inline-flex min-h-[46px] items-center justify-center rounded-[16px] bg-navy px-4 text-[15px] font-semibold text-white transition-colors hover:bg-blue">View menu</Link> : <span className="mt-2 text-sm text-muted">Not accepting orders</span>}
          </Card>
        </li>)}</ul>}
    </ScreenLayout>
  );
}
