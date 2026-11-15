import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'dark' | 'outline' | 'danger' | 'dangerOutline';
export type ButtonSize = 'lg' | 'sm';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-navy text-white border-transparent hover:bg-blue active:bg-navy/90',
  dark: 'bg-ink text-white border-transparent hover:bg-ink/85 active:bg-ink/75',
  outline: 'bg-white text-navy border-navy hover:bg-navy-soft active:bg-navy-wash',
  danger: 'bg-danger text-white border-transparent hover:bg-danger/90 active:bg-danger/80',
  dangerOutline: 'bg-white text-danger border-danger hover:bg-danger-wash active:bg-danger-wash/80'
};

const sizeClasses: Record<ButtonSize, string> = {
  lg: 'min-h-control text-[17px]',
  sm: 'min-h-[46px] rounded-[16px] text-[15px]'
};

export function Button({ variant = 'primary', size = 'lg', type = 'button', className, ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex w-full items-center justify-center gap-2 rounded-control border px-5 font-semibold transition-all duration-200 ease-out active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...rest}
    />
  );
}
