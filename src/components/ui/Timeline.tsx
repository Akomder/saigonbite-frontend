import type { TimelineStep } from '../../types';
import { CheckIcon } from '../icons';
import { cn } from '../../utils/cn';

export interface TimelineProps {
  steps: TimelineStep[];
  label: string;
}

export function Timeline({ steps, label }: TimelineProps) {
  return (
    <ol aria-label={label} className="m-0 flex list-none flex-col p-0 px-1">
      {steps.map((step, index) => {
        const next = steps[index + 1];
        const isLast = index === steps.length - 1;
        const linked = Boolean(next) && next.state !== 'pending';
        const reached = step.state !== 'pending';

        return (
          <li
            key={step.label}
            aria-current={step.state === 'current' ? 'step' : undefined}
            className="relative flex items-start gap-3.5 pb-3.5"
          >
            {!isLast ? (
              <span
                aria-hidden="true"
                className={cn('absolute bottom-0.5 left-2.5 top-6 w-0.5', linked ? 'bg-navy' : 'bg-line')}
              />
            ) : null}
            <span
              aria-hidden="true"
              className={cn(
                'grid size-[22px] shrink-0 place-items-center rounded-full border-[1.5px] text-white',
                reached ? 'border-navy bg-navy' : 'border-line bg-white'
              )}
            >
              {step.state === 'done' ? <CheckIcon size={12} /> : null}
            </span>
            <span
              className={cn(
                'flex-1 pt-0.5 text-base',
                reached ? 'text-ink' : 'text-muted',
                step.state === 'current' ? 'font-semibold' : 'font-medium'
              )}
            >
              {step.label}
            </span>
            {step.time ? <span className="pt-1 text-[13px] text-muted">{step.time}</span> : null}
          </li>
        );
      })}
    </ol>
  );
}
