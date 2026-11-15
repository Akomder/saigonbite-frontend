import { useId } from 'react';
import type { CSSProperties } from 'react';

export interface SliderProps {
  label: string;
  minLabel: string;
  maxLabel: string;
  value: number;
  onChange: (value: number) => void;
}

export function Slider({ label, minLabel, maxLabel, value, onChange }: SliderProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[15px] font-semibold">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="range-track my-2 w-full"
        style={{ '--fill': `${value}%` } as CSSProperties}
      />
      <div className="flex justify-between text-xs text-muted">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
