import type { MenuItem } from '../../types/domain';
import { formatVnd } from '../../utils/formatVnd';
import { cn } from '../../utils/cn';
import { PlusIcon } from '../icons';
import { PhotoSlot } from './PhotoSlot';
import { Pill } from './Pill';

export interface ItemRowProps {
  item: MenuItem;
  quantity: number;
  onAdd: (item: MenuItem) => void;
  onRemove?: (item: MenuItem) => void;
}

export function ItemRow({ item, quantity, onAdd, onRemove }: ItemRowProps) {
  return (
    <li
      className={cn(
        'glass-interactive flex items-center gap-3 rounded-card border border-line p-2.5 pr-3 transition-all duration-200 ease-out',
        item.available ? 'bg-white/95 hover:shadow-md' : 'bg-sand'
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
          {quantity > 0 ? <button type="button" aria-label={`Remove one ${item.name}`} onClick={() => onRemove?.(item)} className="grid size-8 place-items-center rounded-full border border-line text-navy">−</button> : null}
          <button
            type="button"
            aria-label={`Add ${item.name}`}
            onClick={() => onAdd(item)}
            className="grid size-9 place-items-center rounded-full bg-navy text-white transition-all duration-200 ease-out hover:bg-blue active:scale-[0.98]"
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
