import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BowlLogo } from '../components/icons';
import { useAuth } from '../state/AuthState';

const nav = [
  ['/driver', 'Available Pickups'],
  ['/driver/active', 'Active Delivery'],
  ['/driver/history', 'Delivery History'],
] as const;

export function DriverLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  async function signOut() {
    try { await logout(); } finally { navigate('/login', { replace: true }); }
  }

  return (
    <div className="min-h-screen bg-transparent pb-24 lg:pb-0">
      <header className="sticky top-0 z-30 px-3 pt-2 lg:px-5 lg:pt-3">
        <div className="glass-nav mx-auto flex min-h-14 max-w-7xl items-center gap-3 px-4 py-2 lg:min-h-[68px] lg:px-5">
          <Link to="/driver" className="flex shrink-0 items-center gap-2 text-navy">
            <BowlLogo size={30} />
            <span className="font-display text-base font-bold tracking-tight sm:text-lg">SAIGONBITE</span>
            <span className="hidden text-sm font-medium text-muted sm:inline">Driver</span>
          </Link>
          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Driver navigation">
            {nav.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/driver'} className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-navy/10 text-navy' : 'text-muted hover:bg-white/60'}`
              }>{label}</NavLink>
            ))}
          </nav>
          <span className="glass-pill hidden whitespace-nowrap px-3 py-2 text-xs font-semibold text-muted lg:inline-flex">{user?.fullName || 'Delivery partner'}</span>
          <button type="button" onClick={signOut} className="glass-pill glass-interactive ml-auto shrink-0 px-3 py-2 text-xs font-semibold text-muted sm:text-sm lg:ml-0">Sign out</button>
        </div>
      </header>
      <main id="content"><Outlet /></main>
      <nav className="glass-nav fixed inset-x-3 bottom-3 z-30 grid h-[62px] grid-cols-3 items-center rounded-full px-2 pb-[env(safe-area-inset-bottom)] lg:hidden" aria-label="Mobile driver navigation">
        {nav.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/driver'} className={({ isActive }) =>
            `rounded-full px-1 py-2 text-center text-[11px] font-semibold transition-colors ${isActive ? 'bg-navy/10 text-navy' : 'text-muted'}`
          }>{label}</NavLink>
        ))}
      </nav>
    </div>
  );
}
