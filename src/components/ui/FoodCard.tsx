import type { FoodItem } from '../../types';
import { HeartIcon } from '../icons';
import { PhotoSlot } from './PhotoSlot';

export interface FoodCardProps { item: FoodItem; onSelect?: (item: FoodItem) => void; }

export function FoodCard({ item, onSelect }: FoodCardProps) {
  return (
    <article className="group relative flex min-h-[225px] flex-col gap-1.5 rounded-[20px] bg-white px-2.5 pb-3 pt-2.5 shadow-[0_6px_17px_rgba(0,0,0,.13)] transition-shadow hover:shadow-lg">
      <PhotoSlot src={item.photo} alt={item.name} className="mb-1 aspect-square w-[142px] max-w-full self-center rounded-[18px] bg-tint" />
      <h3 className="m-0 text-[15px] font-semibold leading-[1.35]"><button type="button" onClick={() => onSelect?.(item)} className="rounded text-left after:absolute after:inset-0 hover:text-navy focus-visible:outline-offset-4">{item.name}</button></h3>
      <span className="truncate text-[14px] leading-5 text-ink">{item.brand}</span>
      <div className="mt-auto flex items-center justify-between gap-1.5 text-[15px] text-ink">{item.rating !== undefined ? <span className="flex items-center gap-1"><span className="text-amber">★</span>{item.rating}</span> : <span/>}<HeartIcon size={24} className="shrink-0 stroke-ink" /></div>
    </article>
  );
}
