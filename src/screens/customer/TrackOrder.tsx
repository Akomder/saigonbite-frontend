import { useState } from 'react';
import { ActionStack, ScreenLayout, Split } from '../../components/layout';
import { Button, Card, Modal, Notice, StatusBanner, Timeline } from '../../components/ui';
import { trackingSteps } from '../../data/orders';
import { useNavigate } from 'react-router-dom';

export default function TrackOrder() {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <ScreenLayout title="Order #SB-1042" width="wide">
      <Split
        primary={
          <>
            <StatusBanner title="Confirmed by the hub">Estimated arrival 12:35 · Hub District 3</StatusBanner>
            <Card variant="muted" className="lg:p-6">
              <Timeline steps={trackingSteps} label="Order progress" />
            </Card>
          </>
        }
        secondary={
          <>
            <Notice tone="warn">
              You can cancel while the order is Placed or Confirmed. Online payments are refunded in full.
            </Notice>
            <ActionStack row>
              <Button variant="dangerOutline" size="sm" onClick={() => setConfirmOpen(true)}>
                Cancel order
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/customer/complaint')}>
                Contact support
              </Button>
            </ActionStack>
          </>
        }
      />
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Cancel this order?"
        description="The hub has only confirmed the order, so you can still cancel. Online payments are refunded in full."
      >
        <div className="flex w-full flex-col gap-2.5">
          <Button variant="danger" onClick={() => navigate('/customer/order-rejected')}>
            Yes, cancel order
          </Button>
          <Button variant="outline" onClick={() => setConfirmOpen(false)}>
            Keep order
          </Button>
        </div>
      </Modal>
    </ScreenLayout>
  );
}
