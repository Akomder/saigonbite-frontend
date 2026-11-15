import { useState } from 'react';
import { ScreenLayout, Section, Split } from '../../components/layout';
import { Button, Card, CardMeta, CardRow, CardTitle, DescriptionList, Field, KeyValue, Pill, RadioGroup } from '../../components/ui';
import { complaintDecisions, complaintTimeline } from '../../mocks/orders';

export default function StaffComplaint() {
  const [decision, setDecision] = useState('partialRefund');
  const [note, setNote] = useState('Sorry for the delay. Delivery fee refunded.');
  const [confirmed, setConfirmed] = useState(false);

  return (
    <ScreenLayout title="Complaint #C-208" width="wide">
      <Split
        primary={
          <>
            <Card as="section" aria-label="Complaint">
              <CardRow>
                <CardTitle>Late delivery</CardTitle>
                <Pill tone={confirmed ? 'green' : 'amber'}>{confirmed ? 'Resolved' : 'Under review'}</Pill>
              </CardRow>
              <CardMeta>Order #SB-1042 · Hub District 3 · 137.000đ</CardMeta>
              <p className="m-0 text-[15px]">Order arrived 45 minutes late.</p>
            </Card>
            <Card variant="muted" as="section" aria-label="Order timeline">
              <DescriptionList>
                {complaintTimeline.map((entry) => (
                  <KeyValue key={entry.label} label={entry.label} value={entry.value} tone={'tone' in entry ? entry.tone : 'neutral'} />
                ))}
              </DescriptionList>
            </Card>
          </>
        }
        secondary={
          <>
            <Section title="Decision">
              <RadioGroup label="Decision" options={complaintDecisions} value={decision} onChange={setDecision} />
            </Section>
            <Field label="Note to customer" multiline rows={2} value={note} onChange={(event) => setNote(event.target.value)} />
            {confirmed ? (
              <p role="status" className="m-0 rounded-xl bg-success-wash px-3.5 py-2.5 text-sm font-medium text-success">
                Decision sent to the customer.
              </p>
            ) : null}
            <Button disabled={confirmed} onClick={() => setConfirmed(true)}>
              Confirm decision
            </Button>
          </>
        }
      />
    </ScreenLayout>
  );
}
