import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenLayout, Section, Split } from '../../components/layout';
import { Button, Card, DescriptionList, KeyValue, RadioGroup } from '../../components/ui';
import { deliveryFee, paymentOptions, quietHubDiscount, voucherCodes } from '../../data/orders';
import { formatVnd } from '../../utils/formatVnd';

const subtotal = 130000;

export default function Checkout() {
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState('SAIGON10');
  const [appliedCode, setAppliedCode] = useState<string | null>('SAIGON10');
  const [voucherError, setVoucherError] = useState('');
  const [payment, setPayment] = useState('cash');

  const rate = appliedCode ? voucherCodes[appliedCode] : 0;
  const voucher = -Math.round(subtotal * rate);
  const total = subtotal + deliveryFee + voucher - quietHubDiscount;

  const applyVoucher = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = codeInput.trim().toUpperCase();
    if (voucherCodes[code]) {
      setAppliedCode(code);
      setVoucherError('');
    } else {
      setAppliedCode(null);
      setVoucherError('This voucher code is not valid.');
    }
  };

  const summary = (
    <Card as="section" aria-label="Order summary">
      <DescriptionList>
        <KeyValue label="Subtotal" value={formatVnd(subtotal)} />
        <KeyValue label="Delivery fee (2-4 km)" value={formatVnd(deliveryFee)} />
        {appliedCode ? (
          <KeyValue label={`Voucher ${appliedCode} (${Math.round(rate * 100)}%, 1 max)`} value={formatVnd(voucher)} tone="green" />
        ) : null}
        <KeyValue label="Quiet-hub discount" value={formatVnd(-quietHubDiscount)} tone="green" />
      </DescriptionList>
      <hr className="m-0 h-px border-0 bg-line" />
      <DescriptionList>
        <KeyValue label="Total" value={formatVnd(total)} strong />
      </DescriptionList>
    </Card>
  );

  return (
    <ScreenLayout title="Checkout" width="wide">
      <Split
        reverseOnMobile={false}
        sticky
        primary={
          <>
            <Section title="Cooked at Hub District 3 · ~25 min">
              <Card variant="muted">
                <span>Deliver to 12 Nguyen Hue, District 1 (3.1 km)</span>
              </Card>
            </Section>
            <form onSubmit={applyVoucher} className="flex flex-col gap-1.5" noValidate>
              <div className="flex gap-2">
                <label className="sr-only" htmlFor="voucherCode">
                  Voucher code
                </label>
                <input
                  id="voucherCode"
                  value={codeInput}
                  onChange={(event) => setCodeInput(event.target.value)}
                  aria-invalid={Boolean(voucherError)}
                  aria-describedby={voucherError ? 'voucherError' : undefined}
                  className="min-h-field min-w-0 flex-1 rounded-field border border-dashed border-navy bg-navy-soft px-4 font-semibold text-navy outline-none focus-visible:ring-2 focus-visible:ring-blue/50"
                />
                <button
                  type="submit"
                  className="min-h-field rounded-field bg-navy px-5 text-[15px] font-semibold text-white transition-colors hover:bg-blue active:scale-95"
                >
                  Apply
                </button>
              </div>
              {voucherError ? (
                <p id="voucherError" role="alert" className="m-0 text-xs font-medium text-danger">
                  {voucherError}
                </p>
              ) : null}
            </form>
            <Section title="Payment method">
              <RadioGroup label="Payment method" options={paymentOptions} value={payment} onChange={setPayment} />
            </Section>
          </>
        }
        secondary={
          <>
            {summary}
            <Button onClick={() => navigate('/customer/order-placed')}>Place order · {formatVnd(total)}</Button>
          </>
        }
      />
    </ScreenLayout>
  );
}
