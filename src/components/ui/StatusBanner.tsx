import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface StatusBannerProps {
  tone?: 'navy' | 'red';
  title: string;
  children?: ReactNode;
}

export function StatusBanner({ tone = 'navy', title, children }: StatusBannerProps) {
  return (
    <div role="status" className={cn('rounded-card px-4 py-3.5 text-white', tone === 'navy' ? 'bg-navy' : 'bg-danger')}>
      <h2 className="m-0 font-display text-xl font-semibold leading-snug">{title}</h2>
      {children ? <p className={cn('mt-1 text-sm', tone === 'navy' ? 'text-tint' : 'text-danger-wash')}>{children}</p> : null}
    </div>
  );
}
