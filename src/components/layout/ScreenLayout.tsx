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
  narrow: 'md:max-w-xl',
  default: 'md:max-w-4xl',
  wide: 'md:max-w-7xl'
};

export function ScreenLayout({ title, action, hideBack = false, width = 'default', footer, children }: ScreenLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100dvh-5.25rem)] flex-col md:min-h-[calc(100dvh-4rem)]">
      <div className={cn('screen-shell flex w-full flex-1 flex-col gap-5 lg:gap-6', widthClasses[width])}>
        <div className="flex min-h-10 items-center gap-3">
          {hideBack ? null : (
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Back"
              className="grid size-10 shrink-0 place-items-center rounded-[20px] bg-sand text-ink transition-colors hover:bg-neutral-wash active:scale-95"
            >
              <ChevronLeftIcon size={24} />
            </button>
          )}
          <h1 className="screen-title m-0">{title}</h1>
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
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start lg:gap-6">
      <div className={cn('flex flex-col gap-5 lg:col-span-8', reverseOnMobile && 'order-2 lg:order-1')}>{primary}</div>
      <div className={cn('flex flex-col gap-5 lg:col-span-4', reverseOnMobile && 'order-1 lg:order-2', sticky && 'lg:sticky lg:top-24')}>
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
