import type { ReactNode } from 'react';
import type { Tone } from '../../types';
import { cn } from '../../utils/cn';

export interface PillProps {
  tone?: Tone;
  children: ReactNode;
}

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-neutral-wash text-muted',
  green: 'bg-success-wash text-success',
  amber: 'bg-amber-wash text-amber-ink',
  red: 'bg-danger-wash text-danger',
  navy: 'bg-navy-wash text-navy'
};

export function Pill({ tone = 'neutral', children }: PillProps) {
  return (
    <span className={cn('inline-block whitespace-nowrap rounded-xl px-2.5 py-1 text-xs font-semibold', toneClasses[tone])}>
      {children}
    </span>
  );
}
