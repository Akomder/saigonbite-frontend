import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { SearchIcon } from '../components/icons';
import { useAppState } from '../state/AppState';
import { useAuth } from '../state/AuthState';

const nav = [
  ['/restaurant/kitchen-orders', 'Orders'],
  ['/restaurant/menu', 'Menu'],
  ['/admin/vouchers', 'Vouchers'],
  ['/manager/reports', 'Reports'],
];

export function RestaurantLayout() {
  const { logout } = useAuth();
  const { hub, orders } = useAppState();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  async function signOut() {
    try { await logout(); } finally { navigate('/login', { replace: true }); }
  }

  return (
    <div className="min-h-screen bg-transparent pb-24 lg:pb-0">
      <header className="sticky top-0 z-30 px-3 pt-2 lg:px-5 lg:pt-3">
        <div className="glass-nav mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-3 px-4 py-2 lg:min-h-[68px] lg:px-5">
          <Link to="/restaurant/kitchen-orders" className="shrink-0 font-display text-base font-bold text-navy sm:text-lg">SaigonBite <span className="font-sans text-sm font-medium text-muted">Operations</span></Link>
          <form role="search" onSubmit={event => { event.preventDefault(); navigate('/restaurant/kitchen-orders', { state: { search: search.trim() } }); }} className="hidden min-w-[180px] max-w-xs flex-1 items-center gap-2 rounded-full border border-white/80 bg-white/60 px-4 py-2 text-muted shadow-inner lg:flex">
            <SearchIcon size={17}/><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search orders or menu" className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted" />
          </form>
          <Link to="/restaurant/menu" className="glass-pill hidden whitespace-nowrap px-3 py-2 text-sm font-medium text-ink md:inline-flex">{hub?.name || 'Kitchen hub'}</Link>
          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Operations navigation">
            {nav.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-navy/10 text-navy' : 'text-muted hover:bg-white/60'}`}>{label}</NavLink>)}
          </nav>
          <Link to="/restaurant/kitchen-orders" className="glass-pill hidden items-center gap-2 whitespace-nowrap px-3 py-2 text-xs font-semibold text-navy lg:inline-flex"><span className="size-2 rounded-full bg-success"/>{orders.filter(order => order.stage === 'New').length} new</Link>
          <span className="glass-pill hidden whitespace-nowrap px-3 py-2 text-xs font-semibold text-muted lg:inline-flex">Kitchen staff</span>
          <button type="button" onClick={signOut} className="glass-pill glass-interactive shrink-0 px-3 py-2 text-xs font-semibold text-muted sm:text-sm">Sign out</button>
        </div>
      </header>
      <main id="content"><Outlet /></main>
      <nav className="glass-nav fixed inset-x-3 bottom-3 z-30 grid h-[62px] grid-cols-5 items-center rounded-full px-2 pb-[env(safe-area-inset-bottom)] lg:hidden" aria-label="Mobile operations navigation">
        {nav.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => `rounded-full px-1 py-2 text-center text-[11px] font-semibold transition-colors ${isActive ? 'bg-navy/10 text-navy' : 'text-muted'}`}>{label}</NavLink>)}
        <button type="button" onClick={signOut} className="rounded-full px-1 py-2 text-center text-[11px] font-semibold text-danger">Sign out</button>
      </nav>
    </div>
  );
}
