import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenLayout } from '../../components/layout';
import { Button, Card, CardMeta, CardRow, CardTitle, Pill, ProgressBar, Segmented, Switch } from '../../components/ui';
import { kitchenOrders, kitchenTabs } from '../../data/orders';

type Tab = (typeof kitchenTabs)[number];

const stageTone = { New: 'navy', Preparing: 'amber', Ready: 'green' } as const;

export default function KitchenOrders() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('New');
  const [confirmedIds, setConfirmedIds] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);

  const counts = kitchenTabs.reduce<Record<Tab, number>>(
    (result, name) => ({ ...result, [name]: kitchenOrders.filter((order) => order.stage === name).length }),
    { New: 0, Preparing: 0, Ready: 0 }
  );
  const visibleOrders = kitchenOrders.filter((order) => order.stage === tab);

  return (
    <ScreenLayout title="Incoming orders" width="wide" hideBack>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-8">
        <div className="flex flex-col gap-4 lg:order-2">
          <Card variant="muted" as="section" aria-label="Kitchen load">
            <CardRow>
              <CardTitle>Hub District 3 · Kitchen load</CardTitle>
              <Pill tone={paused ? 'red' : 'amber'}>{paused ? 'Paused' : 'Busy'}</Pill>
            </CardRow>
            <ProgressBar value={0.8} tone="amber" label="Kitchen load" />
            <CardMeta>8 of 10 orders in progress. New orders pause at 10.</CardMeta>
          </Card>
          <Card variant="muted">
            <CardRow>
              <CardTitle>Pause new orders</CardTitle>
              <Switch label="Pause new orders" checked={paused} onChange={setPaused} />
            </CardRow>
          </Card>
        </div>

        <div className="flex flex-col gap-4 lg:order-1">
          <Segmented
            compact
            label="Order stage"
            options={kitchenTabs}
            value={tab}
            onChange={setTab}
          />
          <p className="m-0 text-sm text-muted" aria-live="polite">
            {counts[tab]} {tab.toLowerCase()} {counts[tab] === 1 ? 'order' : 'orders'}
          </p>
          <ul className="m-0 grid grid-cols-1 list-none gap-3 p-0 md:grid-cols-2">
            {visibleOrders.map((order) => {
              const confirmed = confirmedIds.includes(order.id);
              return (
                <li key={order.id}>
                  <Card as="article" className="h-full">
                    <CardRow>
                      <CardTitle>{order.id}</CardTitle>
                      <Pill tone={confirmed ? 'amber' : stageTone[order.stage]}>{confirmed ? 'Confirmed' : order.stage}</Pill>
                    </CardRow>
                    <p className="m-0 text-[15px]">{order.items}</p>
                    <CardMeta>{order.meta}</CardMeta>
                    {order.stage === 'New' ? (
                      <div className="mt-auto grid grid-cols-2 gap-2.5 pt-2">
                        <Button variant="dangerOutline" size="sm" onClick={() => navigate('/restaurant/kitchen-reject')}>
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          disabled={confirmed}
                          onClick={() => setConfirmedIds((current) => [...current, order.id])}
                        >
                          {confirmed ? 'Confirmed' : 'Confirm'}
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-auto pt-2">
                        <Button variant="outline" size="sm" onClick={() => navigate('/restaurant/kitchen-prepare')}>
                          Open order
                        </Button>
                      </div>
                    )}
                  </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ScreenLayout>
  );
}
