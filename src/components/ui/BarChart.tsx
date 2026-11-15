import type { ChartDatum } from '../../types';
import { cn } from '../../utils/cn';

export interface BarChartProps {
  data: ChartDatum[];
  highlightIndex?: number;
  label: string;
}

export function BarChart({ data, highlightIndex, label }: BarChartProps) {
  const max = Math.max(...data.map((item) => item.value));

  return (
    <figure className="m-0">
      <ul aria-label={label} className="m-0 grid h-44 list-none grid-flow-col auto-cols-fr items-end gap-2 p-0 sm:h-56 sm:gap-4">
        {data.map((item, index) => (
          <li key={item.label} className="flex h-full flex-col items-center justify-end gap-1">
            <span className="text-[11px] font-medium text-muted">{item.value}</span>
            <span
              role="img"
              aria-label={`${item.label}: ${item.value}`}
              className={cn(
                'block w-full max-w-10 rounded-md transition-colors duration-150',
                index === highlightIndex ? 'bg-navy' : 'bg-blue hover:bg-navy/80'
              )}
              style={{ height: `${(item.value / max) * 75}%` }}
            />
            <span className="text-[11px] text-muted">{item.label}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
