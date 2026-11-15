import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenLayout } from '../../components/layout';
import { Card, CardMeta, CardRow, CardTitle, Notice, Pill, RowActions } from '../../components/ui';
import { vouchers } from '../../data/admin';

export default function AdminVouchers() {
  const navigate = useNavigate();
  const [deactivated, setDeactivated] = useState<string[]>([]);

  return (
    <ScreenLayout
      title="Vouchers"
      width="wide"
      hideBack
      action={{ label: '+ New', onClick: () => navigate('/restaurant/admin-voucher-form') }}
    >
      <ul className="m-0 grid grid-cols-1 list-none gap-3 p-0 md:grid-cols-2 lg:gap-5">
        {vouchers.map((voucher) => {
          const inactive = deactivated.includes(voucher.code);
          return (
            <li key={voucher.code}>
              <Card as="article" className="h-full">
                <CardRow>
                  <CardTitle>{voucher.code}</CardTitle>
                  <Pill tone={inactive ? 'neutral' : voucher.tone}>{inactive ? 'Inactive' : voucher.status}</Pill>
                </CardRow>
                <p className="m-0 text-[15px]">{voucher.rule}</p>
                <CardMeta>{voucher.period}</CardMeta>
                <div className="mt-auto pt-1">
                  <RowActions
                    editLabel="Edit"
                    removeLabel={inactive ? 'Deactivated' : 'Deactivate'}
                    onEdit={() => navigate('/restaurant/admin-voucher-form')}
                    onRemove={() => setDeactivated((current) => (current.includes(voucher.code) ? current : [...current, voucher.code]))}
                  />
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
      <Notice>A customer can use at most one voucher per order.</Notice>
    </ScreenLayout>
  );
}
