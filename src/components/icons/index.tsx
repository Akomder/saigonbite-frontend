import { createIcon } from './createIcon';
import type { IconProps } from './createIcon';

export type { IconProps };

export const ChevronLeftIcon = createIcon('ChevronLeftIcon', <path d="m15 18-6-6 6-6" />);
export const ChevronRightIcon = createIcon('ChevronRightIcon', <path d="m9 18 6-6-6-6" />);
export const SearchIcon = createIcon('SearchIcon', <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3" />);
export const HeartIcon = createIcon(
  'HeartIcon',
  <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
);
export const HomeIcon = createIcon('HomeIcon', <path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10" />);
export const UserIcon = createIcon(
  'UserIcon',
  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
);
export const MessageIcon = createIcon('MessageIcon', <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />);
export const PlusIcon = createIcon('PlusIcon', <path d="M12 5v14M5 12h14" />);
export const MinusIcon = createIcon('MinusIcon', <path d="M5 12h14" />);
export const CheckIcon = createIcon('CheckIcon', <path d="M20 6 9 17l-5-5" />);
export const SlidersIcon = createIcon(
  'SlidersIcon',
  <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
);
export const LogoutIcon = createIcon('LogoutIcon', <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />);
export const MenuIcon = createIcon('MenuIcon', <path d="M4 6h16M4 12h16M4 18h16" />);
export const CloseIcon = createIcon('CloseIcon', <path d="M18 6 6 18M6 6l12 12" />);
export const ImageIcon = createIcon(
  'ImageIcon',
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
  </>
);

export function StarIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

export function BowlLogo({ size = 96, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" aria-hidden="true" focusable="false" {...rest}>
      <path d="M14 46h68c0 20-14 34-34 34S14 66 14 46z" fill="currentColor" />
      <path
        d="M36 36c-4-5 4-8 0-14M48 36c-4-5 4-8 0-14M60 36c-4-5 4-8 0-14"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M32 86h32" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
