import { useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useFocusTrap } from '../../hooks/useFocusTrap';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function Modal({ open, onClose, title, description, icon, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  useEscapeKey(open, onClose);
  useFocusTrap(open, panelRef);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-backdrop/90 p-gutter" onMouseDown={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onMouseDown={(event) => event.stopPropagation()}
        className="flex w-full max-w-sm flex-col items-center gap-4 rounded-modal bg-white px-6 pb-6 pt-8 text-center shadow-2xl"
      >
        {icon ? (
          <span className="grid size-[72px] place-items-center rounded-full bg-navy text-white">{icon}</span>
        ) : null}
        <h2 id={titleId} className="m-0 font-display text-2xl font-semibold">
          {title}
        </h2>
        <p id={descriptionId} className="m-0 text-[15px] leading-relaxed text-muted">
          {description}
        </p>
        {children}
      </div>
    </div>
  );
}
