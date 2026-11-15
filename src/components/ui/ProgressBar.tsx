import type { Tone } from '../../types';
import { cn } from '../../utils/cn';

export interface ProgressBarProps {
  value: number;
  tone?: Tone;
  label: string;
}

const fillTone: Record<Tone, string> = {
  neutral: 'bg-muted',
  navy: 'bg-navy',
  green: 'bg-success',
  amber: 'bg-amber',
  red: 'bg-danger'
};

export function ProgressBar({ value, tone = 'navy', label }: ProgressBarProps) {
  const percent = Math.round(value * 100);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="h-2.5 w-full overflow-hidden rounded-full bg-sand"
    >
      <span className={cn('block h-full rounded-full transition-[width] duration-300', fillTone[tone])} style={{ width: `${percent}%` }} />
    </div>
  );
}
