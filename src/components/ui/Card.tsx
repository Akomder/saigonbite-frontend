import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type CardVariant = 'outline' | 'muted' | 'selected' | 'disabled';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  as?: 'div' | 'article' | 'section';
}

const variantClasses: Record<CardVariant, string> = {
  outline: 'border border-line bg-white',
  muted: 'bg-sand',
  selected: 'border border-navy bg-navy-soft',
  disabled: 'border border-line bg-sand opacity-80'
};

export function Card({ variant = 'outline', as: Tag = 'div', className, ...rest }: CardProps) {
  return <Tag className={cn('flex flex-col gap-2 rounded-card px-4 py-3.5', variantClasses[variant], className)} {...rest} />;
}

export function CardRow({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-wrap items-center justify-between gap-2.5', className)} {...rest} />;
}

export function CardTitle({ className, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('m-0 text-[17px] font-semibold', className)} {...rest} />;
}

export function CardMeta({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('m-0 text-[13px] text-muted', className)} {...rest} />;
}
