import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionStack, ScreenLayout, Split } from '../../components/layout';
import { Button, Field, Notice, RadioGroup } from '../../components/ui';
import { rejectReasons } from '../../mocks/orders';

export default function KitchenReject() {
  const navigate = useNavigate();
  const [reason, setReason] = useState('outOfStock');
  const [note, setNote] = useState('Banh Mi Thit Nuong sold out.');
  const [rejected, setRejected] = useState(false);

  return (
    <ScreenLayout title="Reject #SB-1044" width="wide">
      <Notice>The customer sees the reason. An online payment is refunded in full.</Notice>
      <Split
        primary={<RadioGroup label="Reject reason" options={rejectReasons} value={reason} onChange={setReason} />}
        secondary={
          <>
            <Field label="Note to customer" multiline rows={3} value={note} onChange={(event) => setNote(event.target.value)} />
            {rejected ? (
              <p role="status" className="m-0 rounded-xl bg-danger-wash px-3.5 py-2.5 text-sm font-medium text-danger">
                Order #SB-1044 was rejected and the customer was notified.
              </p>
            ) : null}
            <ActionStack>
              <Button variant="danger" disabled={note.trim() === ''} onClick={() => setRejected(true)}>
                Confirm reject
              </Button>
              <Button variant="outline" onClick={() => navigate('/restaurant/kitchen-orders')}>
                Back
              </Button>
            </ActionStack>
          </>
        }
      />
    </ScreenLayout>
  );
}
