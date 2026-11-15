import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenLayout } from '../../components/layout';
import { Button, PhotoSlot, Slider, Stepper } from '../../components/ui';
import { formatVnd } from '../../utils/formatVnd';

const unitPrice = 65000;

export default function Product() {
  const navigate = useNavigate();
  const [spice, setSpice] = useState(35);
  const [portion, setPortion] = useState(2);

  return (
    <ScreenLayout title="Pho Bo Tai" width="wide">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:items-start md:gap-8">
        <PhotoSlot className="aspect-[4/3] w-full rounded-[20px] md:sticky md:top-24" />
        <article className="flex flex-col gap-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="m-0 font-display text-[26px] font-semibold sm:text-3xl">Pho Bo Tai</h2>
            <span className="text-sm text-muted">★ 4.9 · 26 mins</span>
          </div>
          <p className="m-0 text-[15px] leading-relaxed text-muted">
            Slow-simmered beef bone broth with rare beef slices, rice noodles, fresh herbs and lime. Cooked to order at
            your nearest SaigonBite hub.
          </p>
          <Slider label="Spicy" minLabel="Mild" maxLabel="Hot" value={spice} onChange={setSpice} />
          <Stepper label="Portion" value={portion} onChange={setPortion} />
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <span
              className="grid min-h-control place-items-center rounded-control bg-navy-wash px-5 text-lg font-bold text-navy"
              aria-label={`Price per portion ${formatVnd(unitPrice)}`}
            >
              {formatVnd(unitPrice)}
            </span>
            <Button variant="dark" className="sm:flex-1" onClick={() => navigate('/customer/checkout')}>
              ORDER NOW
            </Button>
          </div>
        </article>
      </div>
    </ScreenLayout>
  );
}
