import { MinusIcon, PlusIcon } from '../icons';

export interface StepperProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const buttonClasses =
  'grid size-9 place-items-center rounded-full bg-navy text-white transition-colors duration-150 hover:bg-blue active:scale-95 disabled:bg-line disabled:hover:bg-line';

export function Stepper({ label, value, onChange, min = 1, max = 20 }: StepperProps) {
  return (
    <div className="flex items-center justify-between" role="group" aria-label={label}>
      <span className="text-[15px] font-semibold">{label}</span>
      <div className="flex items-center gap-4">
        <button type="button" aria-label={`Decrease ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)} className={buttonClasses}>
          <MinusIcon size={18} />
        </button>
        <output aria-live="polite" className="min-w-5 text-center text-lg font-semibold">
          {value}
        </output>
        <button type="button" aria-label={`Increase ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)} className={buttonClasses}>
          <PlusIcon size={18} />
        </button>
      </div>
    </div>
  );
}
