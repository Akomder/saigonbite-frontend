import { cn } from '../../utils/cn';

export interface ChipRowProps<T extends string> {
  items: readonly T[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

export function ChipRow<T extends string>({ items, value, onChange, label }: ChipRowProps<T>) {
  return (
    <div role="group" aria-label={label} className="-mx-gutter flex gap-2 overflow-x-auto px-gutter pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {items.map((item) => {
        const selected = item === value;
        return (
          <button
            key={item}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(item)}
            className={cn(
              'glass-interactive shrink-0 rounded-[20px] px-4 py-[9px] text-sm font-medium transition-all duration-200 ease-out active:scale-[0.98]',
              selected ? 'bg-navy text-white' : 'glass-pill text-muted hover:bg-white/90'
            )}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
