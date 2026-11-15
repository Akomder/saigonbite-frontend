import { Link, NavLink, Outlet } from 'react-router-dom';
import { BowlLogo } from '../components/icons';
import { RoleSwitcher } from '../components/layout/RoleSwitcher';

const nav = [['/', 'Discover'], ['/hubs', 'Nearby hubs'], ['/orders', 'Orders'], ['/profile', 'Profile']];
export function CustomerLayout() {
  return <div className="min-h-screen bg-cream pb-16 md:pb-0"><header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur"><div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6"><Link to="/" className="flex items-center gap-2 text-navy"><BowlLogo size={32}/><span className="font-display text-lg font-bold">SAIGONBITE</span></Link><nav className="ml-auto hidden items-center gap-2 md:flex" aria-label="Customer navigation">{nav.map(([to,label])=><NavLink key={to} to={to} end={to==='/'} className={({isActive})=>`rounded-full px-4 py-2 text-sm font-medium ${isActive?'bg-navy-wash text-navy':'text-muted hover:bg-sand'}`}>{label}</NavLink>)}</nav><RoleSwitcher/></div></header><main id="content"><Outlet/></main><nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-line bg-white px-2 pb-[env(safe-area-inset-bottom)] pt-2 md:hidden" aria-label="Mobile customer navigation">{nav.map(([to,label])=><NavLink key={to} to={to} end={to==='/'} className={({isActive})=>`py-2 text-center text-xs font-semibold ${isActive?'text-navy':'text-muted'}`}>{label}</NavLink>)}</nav></div>;
}
