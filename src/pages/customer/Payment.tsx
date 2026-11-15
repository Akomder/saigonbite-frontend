import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenLayout, Section, Split } from '../../components/layout';
import { Button, Checkbox, DescriptionList, KeyValue, PaymentCard } from '../../components/ui';
import { formatVnd } from '../../utils/formatVnd';

const summary = { subtotal: 130000, voucher: -13000, deliveryFee: 20000 };
const total = summary.subtotal + summary.voucher + summary.deliveryFee;

const cards = [
  { id: 'mastercard', brand: 'Foreign card · Mastercard', number: '5105 **** **** 0505', tone: 'dark' as const },
  { id: 'visa', brand: 'VISA', number: '3566 **** **** 0505', tone: 'light' as const }
];

export default function Payment() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState('mastercard');
  const [saveCard, setSaveCard] = useState(false);

  return (
    <ScreenLayout
      title="Payment"
      width="wide"
      footer={
        <div className="sticky bottom-0 z-20 border-t border-line bg-white/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-gutter py-3 lg:px-8">
            <div className="flex flex-col">
              <span className="text-sm text-muted">Total price</span>
              <strong className="text-xl font-bold">{formatVnd(total)}</strong>
            </div>
            <Button variant="dark" className="flex-1 sm:ml-auto sm:max-w-xs" onClick={() => navigate('/orders/placed')}>
              Pay Now
            </Button>
          </div>
        </div>
      }
    >
      <Split
        primary={
          <Section title="Payment methods">
            <div role="radiogroup" aria-label="Saved cards" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {cards.map((card) => (
                <PaymentCard
                  key={card.id}
                  brand={card.brand}
                  number={card.number}
                  tone={card.tone}
                  selected={selectedCard === card.id}
                  onSelect={() => setSelectedCard(card.id)}
                />
              ))}
            </div>
            <Checkbox label="Save card details for future orders" checked={saveCard} onChange={setSaveCard} />
          </Section>
        }
        secondary={
          <Section title="Order summary">
            <DescriptionList>
              <KeyValue label="Subtotal" value={formatVnd(summary.subtotal)} />
              <KeyValue label="Voucher" value={formatVnd(summary.voucher)} tone="green" />
              <KeyValue label="Delivery fee" value={formatVnd(summary.deliveryFee)} />
              <KeyValue label="Total:" value={formatVnd(total)} strong />
            </DescriptionList>
            <p className="m-0 text-sm text-muted">Estimated delivery time: 30 - 45 mins</p>
          </Section>
        }
        sticky
      />
    </ScreenLayout>
  );
}
