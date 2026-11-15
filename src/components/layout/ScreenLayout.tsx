import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { ChevronLeftIcon } from '../icons';

export interface ScreenLayoutProps {
  title: string;
  action?: { label: string; onClick: () => void };
  hideBack?: boolean;
  width?: 'narrow' | 'default' | 'wide';
  footer?: ReactNode;
  children: ReactNode;
}

const widthClasses: Record<NonNullable<ScreenLayoutProps['width']>, string> = {
  narrow: 'max-w-xl',
  default: 'max-w-4xl',
  wide: 'max-w-6xl'
};

export function ScreenLayout({ title, action, hideBack = false, width = 'default', footer, children }: ScreenLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className={cn('mx-auto flex w-full flex-1 flex-col gap-5 px-gutter py-6 sm:py-8 lg:gap-6 lg:px-8', widthClasses[width])}>
        <div className="flex items-center gap-3">
          {hideBack ? null : (
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Back"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-sand text-ink transition-colors hover:bg-neutral-wash active:scale-95"
            >
              <ChevronLeftIcon size={24} />
            </button>
          )}
          <h1 className="m-0 font-display text-[22px] font-semibold leading-tight sm:text-2xl lg:text-3xl">{title}</h1>
          {action ? (
            <button
              type="button"
              onClick={action.onClick}
              className="ml-auto min-h-10 rounded-full bg-navy px-4 text-sm font-semibold text-white transition-colors hover:bg-blue active:scale-95"
            >
              {action.label}
            </button>
          ) : null}
        </div>
        {children}
      </div>
      {footer}
    </div>
  );
}

export interface SplitProps {
  primary: ReactNode;
  secondary: ReactNode;
  reverseOnMobile?: boolean;
  sticky?: boolean;
}

export function Split({ primary, secondary, reverseOnMobile = false, sticky = false }: SplitProps) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-8">
      <div className={cn('flex flex-col gap-5', reverseOnMobile && 'order-2 lg:order-1')}>{primary}</div>
      <div className={cn('flex flex-col gap-5', reverseOnMobile && 'order-1 lg:order-2', sticky && 'lg:sticky lg:top-24')}>
        {secondary}
      </div>
    </div>
  );
}

export function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2.5">
      {title ? <h2 className="m-0 text-base font-semibold">{title}</h2> : null}
      {children}
    </section>
  );
}

export function ActionStack({ children, row = false }: { children: ReactNode; row?: boolean }) {
  return <div className={cn('flex flex-col gap-2.5', row && 'sm:flex-row sm:[&>*]:flex-1')}>{children}</div>;
}
