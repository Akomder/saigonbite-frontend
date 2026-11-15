import { createIcon } from './createIcon';
import type { IconProps } from './createIcon';

export type { IconProps };

export const ChevronLeftIcon = createIcon('ChevronLeftIcon', <path d="m15 18-6-6 6-6" />);
export const ChevronRightIcon = createIcon('ChevronRightIcon', <path d="m9 18 6-6-6-6" />);
export const SearchIcon = createIcon('SearchIcon', <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3" />);
export const MailIcon = createIcon('MailIcon', <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>);
export const LockIcon = createIcon('LockIcon', <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></>);
export const UserCircleIcon = createIcon('UserCircleIcon', <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="9" r="3"/><path d="M6.5 19a6 6 0 0 1 11 0"/></>);
export const PhoneIcon = createIcon('PhoneIcon', <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/>);
export const EyeIcon = createIcon('EyeIcon', <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>);
export const EyeOffIcon = createIcon('EyeOffIcon', <><path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.9 5.2A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a15 15 0 0 1-3.1 3.8M6.2 6.2C3.5 8.1 2 12 2 12s3.5 7 10 7a10 10 0 0 0 4.1-.9"/></>);
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
      <path d="M17 43 78 27M18 49 79 34" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 47c3-10 10-15 18-15 8 0 14 5 17 15M39 47c2-7 6-10 11-10s9 4 11 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M71 47c3-8 8-12 15-12-1 8-5 13-14 15" fill="currentColor" />
      <path d="M12 49h72c-1 19-14 33-36 33S13 68 12 49Z" fill="currentColor" />
      <path d="M28 51c7 0 9 8 20 8s13-8 20-8" stroke="white" strokeOpacity=".92" strokeWidth="4" strokeLinecap="round" />
      <path d="M47 82v8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
