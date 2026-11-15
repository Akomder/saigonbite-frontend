import type { ReactNode } from 'react';
import type { Tone } from '../../types';
import { cn } from '../../utils/cn';

export interface KeyValueProps {
  label: string;
  value: ReactNode;
  tone?: Tone;
  strong?: boolean;
}

const valueTone: Record<Tone, string> = {
  neutral: 'text-ink',
  green: 'text-success',
  amber: 'text-amber-ink',
  red: 'text-danger',
  navy: 'text-navy'
};

export function KeyValue({ label, value, tone = 'neutral', strong = false }: KeyValueProps) {
  return (
    <div className={cn('flex items-center justify-between gap-3', strong ? 'text-[17px]' : 'text-[15px]')}>
      <dt className={cn(strong ? 'font-semibold text-ink' : 'text-muted')}>{label}</dt>
      <dd className={cn('m-0 text-right', strong ? 'font-semibold' : 'font-medium', valueTone[tone])}>{value}</dd>
    </div>
  );
}
