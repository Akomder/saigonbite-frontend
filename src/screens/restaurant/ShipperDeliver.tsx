import { useState } from 'react';
import { ActionStack, ScreenLayout, Split } from '../../components/layout';
import { Button, Card, DescriptionList, KeyValue, StatusBanner } from '../../components/ui';
import { formatVnd } from '../../utils/formatVnd';

type DeliveryState = 'enRoute' | 'delivered' | 'failed';

export default function ShipperDeliver() {
  const [state, setState] = useState<DeliveryState>('enRoute');

  return (
    <ScreenLayout title="Delivery #SB-1042" width="wide">
      <Split
        primary={
          <>
            {state === 'enRoute' ? (
              <StatusBanner title="Out for delivery">
                Hub District 3 → 12 Nguyen Hue, District 1
                <br />
                3.1 km · ETA 12:35
              </StatusBanner>
            ) : null}
            {state === 'delivered' ? <StatusBanner title="Delivered">Cash of 137.000đ collected from the customer.</StatusBanner> : null}
            {state === 'failed' ? <StatusBanner tone="red" title="Delivery failed">Support has been told and will contact the customer.</StatusBanner> : null}
            <div
              role="img"
              aria-label="Route map placeholder"
              className="map-grid grid min-h-44 place-items-center rounded-card bg-navy-soft text-sm font-semibold text-navy md:min-h-72"
            >
              Map
            </div>
          </>
        }
        secondary={
          <>
            <Card as="section" aria-label="Delivery details">
              <DescriptionList>
                <KeyValue label="Customer" value="Linh N." />
                <KeyValue label="Phone" value="Call via app" tone="navy" />
                <KeyValue label="Payment" value="Cash on delivery" />
                <KeyValue label="Cash to collect" value={formatVnd(137000)} strong />
              </DescriptionList>
            </Card>
            <ActionStack>
              <Button disabled={state !== 'enRoute'} onClick={() => setState('delivered')}>
                Delivered · cash collected
              </Button>
              <Button variant="dangerOutline" disabled={state !== 'enRoute'} onClick={() => setState('failed')}>
                Report failed delivery
              </Button>
            </ActionStack>
          </>
        }
      />
    </ScreenLayout>
  );
}
