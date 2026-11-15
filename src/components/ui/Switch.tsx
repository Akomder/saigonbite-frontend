import { cn } from '../../utils/cn';

export interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Switch({ label, checked, onChange }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'flex h-[26px] w-[46px] shrink-0 items-center rounded-full p-[3px] transition-colors duration-150',
        checked ? 'justify-end bg-navy' : 'justify-start bg-line'
      )}
    >
      <span className="size-5 rounded-full bg-white shadow-sm" />
    </button>
  );
}
