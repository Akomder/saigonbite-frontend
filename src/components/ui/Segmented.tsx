import { useId } from 'react';
import { cn } from '../../utils/cn';

export interface SegmentedProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  compact?: boolean;
}

export function Segmented<T extends string>({ options, value, onChange, label, compact = false }: SegmentedProps<T>) {
  const id = useId();

  return (
    <div role="tablist" aria-label={label} className={cn('flex gap-1 rounded-field bg-sand p-1', compact ? 'min-h-11' : 'min-h-12')}>
      {options.map((option) => {
        const selected = option === value;
        return (
          <button
            key={option}
            id={`${id}-${option}`}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option)}
            onKeyDown={(event) => {
              const index = options.indexOf(option);
              if (event.key === 'ArrowRight') onChange(options[(index + 1) % options.length]);
              if (event.key === 'ArrowLeft') onChange(options[(index - 1 + options.length) % options.length]);
            }}
            className={cn(
              'flex-1 rounded-[11px] px-2 font-semibold transition-colors duration-150',
              compact ? 'text-[13px] sm:text-sm' : 'text-[15px]',
              selected ? 'bg-navy text-white' : 'text-muted hover:bg-white/60'
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
