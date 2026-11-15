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
              'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 active:scale-95',
              selected ? 'bg-navy text-white' : 'bg-sand text-muted hover:bg-neutral-wash'
            )}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
