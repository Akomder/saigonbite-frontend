import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionStack, ScreenLayout, Split } from '../../components/layout';
import { Button, Card, CardMeta, CardTitle, Checkbox, Pill } from '../../components/ui';
import { prepareChecklist } from '../../data/orders';

export default function KitchenPrepare() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState<boolean[]>(prepareChecklist.map((entry) => entry.checked));
  const [ready, setReady] = useState(false);

  const toggle = (index: number, value: boolean) =>
    setChecked((current) => current.map((entry, position) => (position === index ? value : entry)));

  return (
    <ScreenLayout title="Order #SB-1043" width="wide">
      <div className="flex flex-wrap items-center gap-2.5">
        <Pill tone={ready ? 'green' : 'amber'}>{ready ? 'Ready' : 'Preparing'}</Pill>
        <span className="text-sm text-muted">Started 6 min ago · target 15 min</span>
      </div>
      <Split
        primary={
          <Card as="section" aria-label="Preparation checklist" className="gap-3.5">
            {prepareChecklist.map((entry, index) => (
              <Checkbox key={entry.label} label={entry.label} checked={checked[index]} onChange={(value) => toggle(index, value)} muted />
            ))}
          </Card>
        }
        secondary={
          <>
            <Card variant="muted">
              <CardTitle>Delivery · 3.1 km</CardTitle>
              <CardMeta>Linh N. · phone shared with shipper only</CardMeta>
            </Card>
            <ActionStack>
              <Button disabled={ready} onClick={() => setReady(true)}>
                {ready ? 'Marked ready for pickup' : 'Mark ready for pickup'}
              </Button>
              <Button variant="dangerOutline" onClick={() => navigate('/restaurant/kitchen-availability')}>
                Report item out of stock
              </Button>
            </ActionStack>
          </>
        }
      />
    </ScreenLayout>
  );
}
