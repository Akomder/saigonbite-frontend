import { useState } from 'react';
import { ScreenLayout, Section, Split } from '../../components/layout';
import { Button, Field, Notice, RadioGroup } from '../../components/ui';
import { complaintReasons } from '../../mocks/orders';

export default function Complaint() {
  const [reason, setReason] = useState('lateDelivery');
  const [details, setDetails] = useState('Order arrived 45 minutes late.');
  const [photoCount, setPhotoCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <ScreenLayout title="Report a problem" width="wide">
      <p className="m-0 text-sm text-muted">Order #SB-1042 · Hub District 3</p>
      <Split
        primary={
          <Section title="What went wrong?">
            <RadioGroup label="What went wrong?" options={complaintReasons} value={reason} onChange={setReason} />
          </Section>
        }
        secondary={
          <>
            <Field label="Details" multiline rows={3} value={details} onChange={(event) => setDetails(event.target.value)} />
            <button
              type="button"
              onClick={() => setPhotoCount((count) => count + 1)}
              className="min-h-field rounded-field border border-dashed border-navy bg-navy-soft text-[15px] font-semibold text-navy transition-colors hover:bg-navy-wash active:scale-[0.99]"
            >
              {photoCount === 0 ? '+ Add photo' : `${photoCount} ${photoCount === 1 ? 'photo' : 'photos'} added · + Add another`}
            </button>
            <Notice>Our office staff review every complaint and refund you if the problem is confirmed.</Notice>
            {submitted ? (
              <p role="status" className="m-0 rounded-xl bg-success-wash px-3.5 py-2.5 text-sm font-medium text-success">
                Complaint #C-208 was sent to our office staff.
              </p>
            ) : null}
            <Button onClick={() => setSubmitted(true)}>Submit complaint</Button>
          </>
        }
      />
    </ScreenLayout>
  );
}
