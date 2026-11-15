import { useState } from 'react';
import type { FormEvent } from 'react';
import { ActionStack, ScreenLayout } from '../../components/layout';
import { Button, Field, Notice, Segmented } from '../../components/ui';

const discountTypes = ['Percentage', 'Fixed amount'] as const;
type DiscountType = (typeof discountTypes)[number];

export default function AdminVoucherForm() {
  const [type, setType] = useState<DiscountType>('Percentage');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <ScreenLayout title="Edit voucher" width="default">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-card border border-line bg-white p-5 sm:p-8" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Voucher code" name="code" defaultValue="SAIGON10" />
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-muted">Discount type</span>
            <Segmented label="Discount type" options={discountTypes} value={type} onChange={setType} />
          </div>
          <Field
            label={type === 'Percentage' ? 'Discount value (% of items subtotal)' : 'Discount value (đ off items subtotal)'}
            name="value"
            inputMode="numeric"
            defaultValue={type === 'Percentage' ? '10' : '30.000'}
            key={type}
          />
          <Field label="Minimum order (items subtotal)" name="minimum" defaultValue="100.000đ" />
          <Field label="Valid from" name="validFrom" defaultValue="1 Nov 2026" />
          <Field label="Valid until" name="validUntil" defaultValue="30 Nov 2026" />
          <Field label="Usage limit (total uses)" name="limit" inputMode="numeric" defaultValue="500" />
        </div>
        <Notice>The discount applies to the items subtotal, not the delivery fee. One voucher per order.</Notice>
        {saved ? (
          <p role="status" className="m-0 rounded-xl bg-success-wash px-3.5 py-2.5 text-sm font-medium text-success">
            Voucher saved.
          </p>
        ) : null}
        <ActionStack row>
          <Button type="submit">Save voucher</Button>
          <Button variant="dangerOutline">Deactivate voucher</Button>
        </ActionStack>
      </form>
    </ScreenLayout>
  );
}
