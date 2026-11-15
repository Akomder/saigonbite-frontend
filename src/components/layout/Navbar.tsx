import { Link } from 'react-router-dom';
import { BowlLogo, MenuIcon } from '../icons';

export interface NavbarProps {
  drawerId: string;
  drawerOpen: boolean;
  onMenuClick: () => void;
  homePath: string;
}

export function Navbar({ drawerId, drawerOpen, onMenuClick, homePath }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="flex min-h-16 items-center gap-3 px-gutter lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          aria-controls={drawerId}
          className="grid size-11 place-items-center rounded-full text-navy transition-colors hover:bg-sand active:bg-neutral-wash lg:hidden"
        >
          <MenuIcon size={24} />
        </button>
        <Link to={homePath} className="flex items-center gap-2 rounded-lg text-navy">
          <BowlLogo size={32} />
          <span className="font-display text-lg font-bold tracking-wide">SAIGONBITE</span>
        </Link>
        <p className="ml-auto hidden text-sm text-muted sm:block">Vietnamese cloud-kitchen food, delivered</p>
      </div>
    </header>
  );
}
