import { useNavigate } from 'react-router-dom';
import { CheckIcon } from '../../components/icons';
import { Button, Modal } from '../../components/ui';

export default function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-backdrop">
      <Modal
        open
        onClose={() => navigate('/customer/home')}
        title="Order placed!"
        description="Your order was sent to the hub. A receipt has been sent to your email."
        icon={<CheckIcon size={34} />}
      >
        <Button onClick={() => navigate('/customer/track-order')}>Track order</Button>
      </Modal>
    </div>
  );
}
