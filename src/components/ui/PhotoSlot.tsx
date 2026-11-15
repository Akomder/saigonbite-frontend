import { ImageIcon } from '../icons';
import { cn } from '../../utils/cn';

export interface PhotoSlotProps {
  src?: string;
  alt?: string;
  className?: string;
}

export function PhotoSlot({ src, alt = '', className }: PhotoSlotProps) {
  return (
    <div className={cn('grid place-items-center overflow-hidden rounded-xl bg-tint text-navy', className)}>
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover" loading="lazy" />
      ) : (
        <span className="flex flex-col items-center gap-1 text-[11px]" role="img" aria-label="Photo placeholder">
          <ImageIcon size={22} />
          photo
        </span>
      )}
    </div>
  );
}
