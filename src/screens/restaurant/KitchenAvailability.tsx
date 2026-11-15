import { useState } from 'react';
import { ScreenLayout } from '../../components/layout';
import { Button, Card, CardRow, CardTitle, Pill, Switch } from '../../components/ui';
import { kitchenAvailability } from '../../data/menu';

export default function KitchenAvailability() {
  const [availability, setAvailability] = useState<Record<string, boolean>>(
    Object.fromEntries(kitchenAvailability.map((item) => [item.id, item.available]))
  );
  const [saved, setSaved] = useState(false);

  const update = (id: string, value: boolean) => {
    setAvailability((current) => ({ ...current, [id]: value }));
    setSaved(false);
  };

  return (
    <ScreenLayout title="Item availability" width="wide">
      <p className="m-0 text-sm text-muted">Hub District 3 · changes show to customers right away</p>
      <ul className="m-0 grid grid-cols-1 list-none gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
        {kitchenAvailability.map((item) => (
          <li key={item.id}>
            <Card as="article" className="h-full justify-center">
              <CardRow>
                <div className="flex flex-wrap items-center gap-2.5">
                  <CardTitle>{item.name}</CardTitle>
                  {availability[item.id] ? null : <Pill tone="red">Sold out</Pill>}
                </div>
                <Switch label={item.name} checked={availability[item.id]} onChange={(value) => update(item.id, value)} />
              </CardRow>
            </Card>
          </li>
        ))}
      </ul>
      {saved ? (
        <p role="status" className="m-0 rounded-xl bg-success-wash px-3.5 py-2.5 text-sm font-medium text-success">
          Availability saved. Customers see the update now.
        </p>
      ) : null}
      <Button className="md:max-w-sm" onClick={() => setSaved(true)}>
        Save availability
      </Button>
    </ScreenLayout>
  );
}
