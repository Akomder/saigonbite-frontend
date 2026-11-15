import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionStack, ScreenLayout, Section, Split } from '../../components/layout';
import { Button, Card, CardMeta, CardRow, CardTitle, Field, Notice, Pill } from '../../components/ui';

export default function AddressOutOfRange() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('88 Pham Van Dong, Thu Duc');

  return (
    <ScreenLayout title="Delivery address" width="wide">
      <Split
        primary={
          <>
            <Field
              label="Delivery address"
              name="address"
              autoComplete="street-address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              error="This address is outside the delivery distance."
            />
            <Notice tone="danger" title="Too far for Hub District 3">
              This address is 8.4 km away. We deliver up to 7 km from the hub.
            </Notice>
          </>
        }
        secondary={
          <>
            <Section title="Closer hubs for this address">
              <Card variant="selected" as="article">
                <CardRow>
                  <CardTitle>Hub Thu Duc</CardTitle>
                  <Pill tone="green">Quiet</Pill>
                </CardRow>
                <CardMeta>4.2 km away · ~30 min · 25.000đ delivery</CardMeta>
              </Card>
            </Section>
            <ActionStack>
              <Button onClick={() => navigate('/customer/hub-menu')}>Use Hub Thu Duc</Button>
              <Button variant="outline" onClick={() => setAddress('')}>
                Change address
              </Button>
            </ActionStack>
          </>
        }
      />
    </ScreenLayout>
  );
}
