import { StarIcon } from '../icons';
import { cn } from '../../utils/cn';

export interface StarsProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function Stars({ label, value, onChange }: StarsProps) {
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-2">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          role="radio"
          aria-checked={rating === value}
          aria-label={`${rating} ${rating === 1 ? 'star' : 'stars'}`}
          onClick={() => onChange(rating)}
          className={cn(
            'rounded-md p-0.5 leading-none transition-transform duration-150 hover:scale-110 active:scale-95',
            rating <= value ? 'text-amber' : 'text-line'
          )}
        >
          <StarIcon size={32} />
        </button>
      ))}
    </div>
  );
}
