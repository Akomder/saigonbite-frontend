import { CheckIcon } from '../icons';
import { cn } from '../../utils/cn';

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  muted?: boolean;
}

export function Checkbox({ label, checked, onChange, muted = false }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-base font-medium focus-within:[&>span:first-of-type]:ring-2 focus-within:[&>span:first-of-type]:ring-blue/50">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="sr-only" />
      <span
        aria-hidden="true"
        className={cn(
          'grid size-6 shrink-0 place-items-center rounded-[7px] border-[1.5px] text-white transition-colors duration-150',
          checked ? 'border-navy bg-navy' : 'border-line bg-white'
        )}
      >
        {checked ? <CheckIcon size={14} /> : null}
      </span>
      <span className={cn(muted && checked && 'text-muted line-through')}>{label}</span>
    </label>
  );
}
