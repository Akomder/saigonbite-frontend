import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScreenLayout } from '../../components/layout';
import { Card, CardMeta, CardRow, CardTitle, ChipRow, ErrorBanner, Notice, Pill, Skeleton } from '../../components/ui';
import { hubFilters, hubs } from '../../mocks/menu';
import { hubService } from '../../services/hubService';
import type { Hub } from '../../types/domain';

type Filter = (typeof hubFilters)[number];

export default function BrowseHubs() {
  const [filter, setFilter] = useState<Filter>('All');
  const [hubList,setHubList]=useState<Hub[]>(hubs); const [loading,setLoading]=useState(true); const [error,setError]=useState('');
  useEffect(()=>{let active=true;hubService.getHubs().then(data=>{if(active)setHubList(data);}).catch(()=>{if(active)setError('Hubs could not be loaded. Please try again.');}).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[]);

  const visibleHubs = useMemo(
    () => hubList.filter((hub) => filter === 'All' || hub.brands.toLowerCase().includes(filter === 'Rice' ? 'rice' : filter.toLowerCase())),
    [filter,hubList]
  );

  return (
    <ScreenLayout title="Choose a hub" width="wide">
      <ChipRow label="Brand filter" items={hubFilters} value={filter} onChange={setFilter} />
      {error&&<ErrorBanner>{error}</ErrorBanner>}{loading&&<div className="grid gap-3 md:grid-cols-2" aria-label="Loading hubs"><Skeleton className="h-36"/><Skeleton className="h-36"/></div>}
      <Notice>District 3 hub is quiet right now. Order there for faster cooking and 5.000đ off delivery.</Notice>
      <ul className="m-0 grid grid-cols-1 list-none gap-3 p-0 md:grid-cols-2 lg:gap-5">
        {!loading&&visibleHubs.map((hub) => {
          const content = (
            <Card as="article" variant={hub.closed ? 'disabled' : 'outline'} className="h-full gap-2 transition-shadow duration-150 group-hover:shadow-md">
              <CardRow>
                <CardTitle>{hub.name}</CardTitle>
                <Pill tone={hub.tone}>{hub.status === 'Full' ? 'Full' : hub.status}</Pill>
              </CardRow>
              <CardMeta>
                {hub.distanceKm.toFixed(1)} km · {hub.eta}
              </CardMeta>
              <p className="m-0 text-sm font-medium text-navy">{hub.brands}</p>
            </Card>
          );

          return (
            <li key={hub.id} className="group">
              {hub.closed ? (
                content
              ) : (
                <Link to={`/hubs/${hub.id}`} className="block h-full rounded-card" aria-label={`Open ${hub.name} menu`}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      {visibleHubs.length === 0 ? (
        <p role="status" className="rounded-card bg-sand p-6 text-center text-muted">
          No hubs serve that brand right now.
        </p>
      ) : null}
    </ScreenLayout>
  );
}
