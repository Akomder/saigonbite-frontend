import { useId } from 'react';
import type { Option } from '../../types';
import { cn } from '../../utils/cn';

export interface RadioGroupProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export function RadioGroup({ label, options, value, onChange }: RadioGroupProps) {
  const name = useId();

  return (
    <div role="radiogroup" aria-label={label} className="flex flex-col gap-2.5">
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <label
            key={option.id}
            className={cn(
              'relative flex cursor-pointer items-center gap-3 rounded-field border px-3.5 py-3 transition-colors duration-150 focus-within:ring-2 focus-within:ring-blue/50',
              selected ? 'border-navy bg-navy-soft' : 'border-line bg-white hover:bg-sand'
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={selected}
              onChange={() => onChange(option.id)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className={cn(
                'grid size-5 shrink-0 place-items-center rounded-full border-[1.5px]',
                selected ? 'border-navy' : 'border-line'
              )}
            >
              {selected ? <span className="size-2.5 rounded-full bg-navy" /> : null}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-[15px] font-semibold">{option.title}</span>
              {option.subtitle ? <span className="text-xs text-muted">{option.subtitle}</span> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}
