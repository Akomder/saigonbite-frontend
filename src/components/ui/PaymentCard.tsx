import { cn } from '../../utils/cn';

export interface PaymentCardProps {
  brand: string;
  number: string;
  tone?: 'light' | 'dark';
  selected: boolean;
  onSelect: () => void;
}

export function PaymentCard({ brand, number, tone = 'light', selected, onSelect }: PaymentCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        'flex w-full flex-col gap-5 rounded-card border px-4.5 py-4 text-left transition-all duration-150 active:scale-[0.99]',
        tone === 'dark' ? 'border-ink bg-ink text-white hover:bg-ink/90' : 'border-line bg-white text-ink hover:bg-sand',
        selected && 'ring-2 ring-blue ring-offset-2'
      )}
    >
      <span className="flex items-center justify-between">
        <span className="text-sm font-bold">{brand}</span>
        {selected ? <span className="rounded-[10px] bg-navy px-2.5 py-0.5 text-[11px] font-semibold text-white">Selected</span> : null}
      </span>
      <span className="text-lg font-medium tracking-widest">{number}</span>
    </button>
  );
}
