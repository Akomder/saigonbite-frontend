import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { cn } from '../../utils/cn';
import { CloseIcon } from '../icons';

export interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  title: string;
  children: ReactNode;
}

export function MobileDrawer({ isOpen, onClose, id, title, children }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEscapeKey(isOpen, onClose);
  useFocusTrap(isOpen, panelRef);

  return (
    <div className={cn('lg:hidden', !isOpen && 'pointer-events-none')} aria-hidden={!isOpen}>
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-ink/50 transition-opacity duration-200',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
      />
      <div
        id={id}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[min(86vw,22rem)] flex-col bg-white shadow-drawer transition-transform duration-200',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="font-display text-lg font-semibold text-navy">{title}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-sand"
          >
            <CloseIcon size={22} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{isOpen ? children : null}</div>
      </div>
    </div>
  );
}
