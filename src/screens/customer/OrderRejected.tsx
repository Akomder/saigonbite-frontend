import { useNavigate } from 'react-router-dom';
import { ActionStack, ScreenLayout, Split } from '../../components/layout';
import { Button, Card, CardRow, CardTitle, DescriptionList, KeyValue, Pill, StatusBanner, Timeline } from '../../components/ui';
import { rejectedSteps } from '../../data/orders';
import { formatVnd } from '../../utils/formatVnd';

export default function OrderRejected() {
  const navigate = useNavigate();

  return (
    <ScreenLayout title="Order #SB-1044" width="wide">
      <Split
        primary={
          <>
            <StatusBanner tone="red" title="Rejected by the hub">
              Item out of stock: Banh Mi Thit Nuong
            </StatusBanner>
            <Card variant="muted">
              <Timeline steps={rejectedSteps} label="Order progress" />
            </Card>
          </>
        }
        secondary={
          <>
            <Card as="section" aria-label="Refund">
              <CardRow>
                <CardTitle>Refund</CardTitle>
                <Pill tone="green">Refunded</Pill>
              </CardRow>
              <DescriptionList>
                <KeyValue label="Amount" value={formatVnd(130000)} />
                <KeyValue label="Paid with" value="MoMo" />
                <KeyValue label="Back to your account" value="1-3 days" />
              </DescriptionList>
            </Card>
            <ActionStack>
              <Button onClick={() => navigate('/customer/browse-hubs')}>Order again from another hub</Button>
              <Button variant="outline" onClick={() => navigate('/customer/home')}>
                Back to home
              </Button>
            </ActionStack>
          </>
        }
      />
    </ScreenLayout>
  );
}
