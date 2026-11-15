import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type NoticeTone = 'info' | 'warn' | 'danger';

export interface NoticeProps {
  tone?: NoticeTone;
  title?: string;
  children: ReactNode;
}

const toneClasses: Record<NoticeTone, string> = {
  info: 'bg-tint text-navy',
  warn: 'bg-amber-wash text-amber-ink',
  danger: 'bg-danger-wash text-danger'
};

export function Notice({ tone = 'info', title, children }: NoticeProps) {
  return (
    <div role={tone === 'danger' ? 'alert' : 'note'} className={cn('rounded-xl px-3.5 py-2.5 text-[13px] leading-snug', toneClasses[tone])}>
      {title ? <strong className="block text-sm">{title}</strong> : null}
      {children}
    </div>
  );
}
