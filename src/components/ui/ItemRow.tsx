import type { MenuItem } from '../../types';
import { formatVnd } from '../../utils/formatVnd';
import { cn } from '../../utils/cn';
import { PlusIcon } from '../icons';
import { PhotoSlot } from './PhotoSlot';
import { Pill } from './Pill';

export interface ItemRowProps {
  item: MenuItem;
  quantity: number;
  onAdd: (item: MenuItem) => void;
}

export function ItemRow({ item, quantity, onAdd }: ItemRowProps) {
  return (
    <li
      className={cn(
        'flex items-center gap-3 rounded-card border border-line p-2.5 pr-3 transition-shadow duration-150',
        item.available ? 'bg-white hover:shadow-md' : 'bg-sand'
      )}
    >
      <PhotoSlot className="size-16 shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <strong className={cn('truncate text-base font-semibold', !item.available && 'text-muted')}>{item.name}</strong>
        <small className="text-xs text-muted">{item.brand}</small>
        <span className={cn('text-sm font-medium', item.available ? 'text-navy' : 'text-muted')}>{formatVnd(item.price)}</span>
      </div>
      {item.available ? (
        <div className="flex items-center gap-2">
          {quantity > 0 ? <span className="text-sm font-semibold text-navy">×{quantity}</span> : null}
          <button
            type="button"
            aria-label={`Add ${item.name}`}
            onClick={() => onAdd(item)}
            className="grid size-9 place-items-center rounded-full bg-navy text-white transition-colors duration-150 hover:bg-blue active:scale-95"
          >
            <PlusIcon size={18} />
          </button>
        </div>
      ) : (
        <Pill tone="red">Sold out</Pill>
      )}
    </li>
  );
}
