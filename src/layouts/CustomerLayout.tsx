import { useEffect, useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BowlLogo, HeartIcon, HomeIcon, MessageIcon, PlusIcon, SearchIcon, UserIcon } from '../components/icons';
import { orderService } from '../services/orderService';
import { useAppState } from '../state/AppState';
import type { Order } from '../types/domain';
import { useAuth } from '../state/AuthState';

const nav = [['/', 'Discover'], ['/hubs', 'Nearby hubs'], ['/orders', 'Orders'], ['/profile', 'Profile']];
const activeStatuses = new Set(['Placed', 'Confirmed', 'Preparing', 'Ready', 'Out for delivery']);

export function CustomerLayout() {
  const { selectedHubId } = useAppState();
  const { user } = useAuth();
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    let live = true;
    orderService.getOrders().then(orders => {
      if (live) setActiveOrder(orders.find(order => activeStatuses.has(order.status)) ?? null);
    }).catch(() => { if (live) setActiveOrder(null); });
    return () => { live = false; };
  }, [user?.id]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate('/', { state: { query: search.trim() } });
  }

  return (
    <div className="min-h-screen bg-transparent pb-24 lg:pb-0">
      <header className="sticky top-0 z-30 px-3 pt-2 lg:px-5 lg:pt-3">
        <div className="glass-nav mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-3 px-4 py-2 lg:min-h-[68px] lg:px-5">
          <Link to="/" className="flex shrink-0 items-center gap-2 text-navy"><BowlLogo size={30}/><span className="font-display text-base font-bold tracking-tight sm:text-lg">SAIGONBITE</span></Link>
          <form role="search" onSubmit={submitSearch} className="hidden min-w-[220px] max-w-sm flex-1 items-center gap-2 rounded-full border border-white/80 bg-white/60 px-4 py-2.5 text-muted shadow-inner lg:flex">
            <SearchIcon size={18}/><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search food, brand, or hub" className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted" />
          </form>
          <Link to="/hubs" className="glass-pill glass-interactive hidden whitespace-nowrap px-4 py-2 text-sm font-medium text-ink md:inline-flex">{selectedHubId ? `Hub #${selectedHubId}` : 'Choose a hub'}</Link>
          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Customer navigation">{nav.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-navy/10 text-navy' : 'text-muted hover:bg-white/60'}`}>{label}</NavLink>)}</nav>
          {activeOrder ? <Link to={`/orders/${activeOrder.id}`} className="glass-pill glass-interactive hidden items-center gap-2 whitespace-nowrap px-3 py-2 text-xs font-semibold text-navy lg:inline-flex"><span className="size-2 rounded-full bg-success"/>{activeOrder.status}</Link> : <Link to="/orders" className="glass-pill hidden whitespace-nowrap px-3 py-2 text-xs font-semibold text-muted lg:inline-flex">Order status</Link>}
          <Link to="/profile" className="glass-pill glass-interactive flex shrink-0 items-center gap-2 px-3 py-2 text-sm font-semibold text-navy" aria-label="Account"><UserIcon size={19}/><span className="hidden xl:inline">Account</span></Link>
        </div>
      </header>
      <main id="content"><Outlet /></main>
      <nav className="glass-nav fixed inset-x-3 bottom-3 z-30 h-[66px] rounded-full px-2 pb-[env(safe-area-inset-bottom)] md:inset-x-6 md:bottom-4 lg:hidden" aria-label="Mobile customer navigation">
        <div className="relative grid h-full grid-cols-5 items-center">
          <NavLink to="/" end aria-label="Home" className={({ isActive }) => `grid place-items-center transition-colors ${isActive ? 'text-navy' : 'text-muted'}`}><HomeIcon size={23}/></NavLink>
          <NavLink to="/profile" aria-label="Profile" className={({ isActive }) => `grid place-items-center transition-colors ${isActive ? 'text-navy' : 'text-muted'}`}><UserIcon size={23}/></NavLink>
          <span aria-hidden="true" />
          <NavLink to="/orders" aria-label="Orders" className={({ isActive }) => `grid place-items-center transition-colors ${isActive ? 'text-navy' : 'text-muted'}`}><MessageIcon size={23}/></NavLink>
          <NavLink to="/hubs" aria-label="Browse hubs" className={({ isActive }) => `grid place-items-center transition-colors ${isActive ? 'text-navy' : 'text-muted'}`}><HeartIcon size={23}/></NavLink>
          <Link to="/checkout" aria-label="Go to checkout" className="glass-interactive absolute left-1/2 top-1/2 grid size-[54px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-navy text-white shadow-lg ring-4 ring-white/80"><PlusIcon size={27}/></Link>
        </div>
      </nav>
    </div>
  );
}
