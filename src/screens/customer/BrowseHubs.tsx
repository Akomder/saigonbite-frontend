import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScreenLayout } from '../../components/layout';
import { Card, CardMeta, CardRow, CardTitle, ChipRow, Notice, Pill } from '../../components/ui';
import { hubFilters, hubs } from '../../data/menu';

type Filter = (typeof hubFilters)[number];

export default function BrowseHubs() {
  const [filter, setFilter] = useState<Filter>('All');

  const visibleHubs = useMemo(
    () => hubs.filter((hub) => filter === 'All' || hub.brands.toLowerCase().includes(filter === 'Rice' ? 'rice' : filter.toLowerCase())),
    [filter]
  );

  return (
    <ScreenLayout title="Choose a hub" width="wide">
      <ChipRow label="Brand filter" items={hubFilters} value={filter} onChange={setFilter} />
      <Notice>District 3 hub is quiet right now. Order there for faster cooking and 5.000đ off delivery.</Notice>
      <ul className="m-0 grid grid-cols-1 list-none gap-3 p-0 md:grid-cols-2 lg:gap-5">
        {visibleHubs.map((hub) => {
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
                <Link to="/customer/hub-menu" className="block h-full rounded-card" aria-label={`Open ${hub.name} menu`}>
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
