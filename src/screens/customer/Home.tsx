import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartIcon, HomeIcon, MessageIcon, PlusIcon, SearchIcon, SlidersIcon, UserIcon } from '../../components/icons';
import { ChipRow, FoodCard } from '../../components/ui';
import { foodItems, homeFilters } from '../../data/menu';
import { cn } from '../../utils/cn';

type Filter = (typeof homeFilters)[number];

const navItems = [
  { id: 'home', label: 'Home', Icon: HomeIcon, to: '/customer/home' },
  { id: 'favorites', label: 'Favorites', Icon: HeartIcon, to: '/customer/home' },
  { id: 'messages', label: 'Messages', Icon: MessageIcon, to: '/customer/complaint' },
  { id: 'profile', label: 'Profile', Icon: UserIcon, to: '/customer/profile' }
];

export default function Home() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');

  const visibleItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    return foodItems.filter(
      (item) =>
        (filter === 'All' || item.category === filter) &&
        (term === '' || item.name.toLowerCase().includes(term) || item.brand.toLowerCase().includes(term))
    );
  }, [filter, query]);

  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-gutter py-6 sm:py-8 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="m-0 text-4xl font-extrabold leading-none text-navy sm:text-5xl lg:text-6xl">SAIGON BITE</h1>
            <p className="mt-2 text-sm text-muted sm:text-base">Vietnamese cloud-kitchen food, delivered</p>
          </div>
          <Link
            to="/customer/profile"
            aria-label="Your profile"
            className="grid size-12 shrink-0 place-items-center rounded-full bg-tint text-navy transition-colors hover:bg-navy-wash"
          >
            <UserIcon size={26} />
          </Link>
        </div>

        <form role="search" onSubmit={(event) => event.preventDefault()} className="flex gap-2.5 md:max-w-xl">
          <label className="flex min-h-field min-w-0 flex-1 items-center gap-2.5 rounded-field bg-sand px-4 text-placeholder focus-within:ring-2 focus-within:ring-blue/50">
            <SearchIcon size={20} />
            <span className="sr-only">Search food or brand</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search food or brand"
              className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-placeholder"
            />
          </label>
          <button
            type="button"
            aria-label="Filters"
            onClick={() => navigate('/customer/browse-hubs')}
            className="grid size-field shrink-0 place-items-center rounded-field bg-navy text-white transition-colors hover:bg-blue active:scale-95"
          >
            <SlidersIcon size={20} />
          </button>
        </form>

        <ChipRow label="Food categories" items={homeFilters} value={filter} onChange={setFilter} />

        {visibleItems.length > 0 ? (
          <ul className="m-0 grid list-none grid-cols-2 gap-3.5 p-0 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {visibleItems.map((item) => (
              <li key={item.id} className="relative">
                <FoodCard item={item} onSelect={() => navigate('/customer/product')} />
              </li>
            ))}
          </ul>
        ) : (
          <p role="status" className="rounded-card bg-sand p-6 text-center text-muted">
            Nothing matches your search yet.
          </p>
        )}
      </div>

      <nav
        aria-label="Primary"
        className="sticky bottom-0 z-20 grid grid-cols-5 items-center bg-navy px-4 pb-2 pt-1 text-tint md:hidden"
      >
        {leftItems.map(({ id, label, Icon, to }) => (
          <Link
            key={id}
            to={to}
            aria-label={label}
            aria-current={id === 'home' ? 'page' : undefined}
            className={cn(
              'grid h-14 place-items-center rounded-lg transition-colors hover:text-white',
              id === 'home' && 'text-white'
            )}
          >
            <Icon size={24} />
          </Link>
        ))}
        <Link
          to="/customer/browse-hubs"
          aria-label="New order"
          className="-mt-7 grid size-14 place-items-center justify-self-center rounded-full border-4 border-cream bg-blue text-white transition-transform active:scale-95"
        >
          <PlusIcon size={26} />
        </Link>
        {rightItems.map(({ id, label, Icon, to }) => (
          <Link key={id} to={to} aria-label={label} className="grid h-14 place-items-center rounded-lg transition-colors hover:text-white">
            <Icon size={24} />
          </Link>
        ))}
      </nav>
    </div>
  );
}
