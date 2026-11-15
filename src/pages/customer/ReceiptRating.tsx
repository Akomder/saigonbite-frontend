import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionStack, ScreenLayout, Section, Split } from '../../components/layout';
import { Button, Card, CardTitle, DescriptionList, Field, KeyValue, Stars } from '../../components/ui';
import { formatVnd } from '../../utils/formatVnd';

export default function ReceiptRating() {
  const navigate = useNavigate();
  const [foodRating, setFoodRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(4);
  const [comment, setComment] = useState('Great broth, arrived hot.');
  const [submitted, setSubmitted] = useState(false);

  return (
    <ScreenLayout title="Order delivered" width="wide">
      <Split
        primary={
          <Card as="section" aria-label="Receipt">
            <CardTitle>Receipt #SB-1042</CardTitle>
            <DescriptionList>
              <KeyValue label="2 × Pho Bo Tai" value={formatVnd(130000)} />
              <KeyValue label="Delivery fee (2-4 km)" value={formatVnd(25000)} />
              <KeyValue label="Voucher" value={formatVnd(-13000)} tone="green" />
              <KeyValue label="Quiet-hub discount" value={formatVnd(-5000)} tone="green" />
            </DescriptionList>
            <hr className="m-0 h-px border-0 bg-line" />
            <DescriptionList>
              <KeyValue label="Total · Paid in cash" value={formatVnd(137000)} strong />
            </DescriptionList>
          </Card>
        }
        secondary={
          <>
            <Section title="Rate the food">
              <Stars label="Rate the food" value={foodRating} onChange={setFoodRating} />
            </Section>
            <Section title="Rate the delivery">
              <Stars label="Rate the delivery" value={deliveryRating} onChange={setDeliveryRating} />
            </Section>
            <Field
              label="Comment"
              multiline
              rows={2}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            {submitted ? (
              <p role="status" className="m-0 rounded-xl bg-success-wash px-3.5 py-2.5 text-sm font-medium text-success">
                Thanks, your rating was sent.
              </p>
            ) : null}
            <ActionStack>
              <Button onClick={() => setSubmitted(true)}>Submit rating</Button>
              <Button variant="dangerOutline" onClick={() => navigate('/orders/complaint')}>
                Report a problem
              </Button>
            </ActionStack>
          </>
        }
      />
    </ScreenLayout>
  );
}
