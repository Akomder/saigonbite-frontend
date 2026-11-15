import type { FoodItem } from '../../types';
import { PhotoSlot } from './PhotoSlot';

export interface FoodCardProps {
  item: FoodItem;
  onSelect?: (item: FoodItem) => void;
}

export function FoodCard({ item, onSelect }: FoodCardProps) {
  return (
    <article className="group flex flex-col gap-2 rounded-card border border-line bg-white p-2.5 transition-shadow duration-150 focus-within:shadow-md hover:shadow-md">
      <PhotoSlot src={item.photo} alt={item.name} className="aspect-[4/3] w-full" />
      <h3 className="m-0 text-base font-semibold">
        <button
          type="button"
          onClick={() => onSelect?.(item)}
          className="rounded text-left after:absolute after:inset-0 hover:text-navy focus-visible:outline-offset-4"
        >
          {item.name}
        </button>
      </h3>
      <div className="flex items-center justify-between gap-1.5 text-xs text-muted">
        <span>{item.brand}</span>
        <span className="font-semibold text-amber-ink">★ {item.rating}</span>
      </div>
    </article>
  );
}
