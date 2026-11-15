import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon, SlidersIcon, UserIcon } from '../../components/icons';
import { ChipRow, ErrorBanner, FoodCard, Skeleton } from '../../components/ui';
import { foodItems, homeFilters } from '../../mocks/menu';
import { menuService } from '../../services/menuService';
import type { FoodItem } from '../../types';

type Filter = (typeof homeFilters)[number];

export default function Home() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const [items,setItems]=useState<FoodItem[]>(foodItems);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
  useEffect(()=>{let active=true;menuService.getFeaturedItems().then(data=>{if(active)setItems(data);}).catch(()=>{if(active)setError('The menu could not be loaded. Please try again.');}).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[]);

  const visibleItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items.filter(
      (item) =>
        (filter === 'All' || item.category === filter) &&
        (term === '' || item.name.toLowerCase().includes(term) || item.brand.toLowerCase().includes(term))
    );
  }, [filter, query,items]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-gutter py-6 sm:py-8 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="m-0 text-4xl font-extrabold leading-none text-navy sm:text-5xl lg:text-6xl">SAIGON BITE</h1>
            <p className="mt-2 text-sm text-muted sm:text-base">Vietnamese cloud-kitchen food, delivered</p>
          </div>
          <Link
            to="/profile"
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
            onClick={() => navigate('/hubs')}
            className="grid size-field shrink-0 place-items-center rounded-field bg-navy text-white transition-colors hover:bg-blue active:scale-95"
          >
            <SlidersIcon size={20} />
          </button>
        </form>

        <ChipRow label="Food categories" items={homeFilters} value={filter} onChange={setFilter} />
        {error&&<ErrorBanner>{error}</ErrorBanner>}{loading&&<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4" aria-label="Loading menu">{[0,1,2,3].map(item=><Skeleton key={item} className="h-52 rounded-card" />)}</div>}

        {!loading&&visibleItems.length > 0 ? (
          <ul className="m-0 grid list-none grid-cols-2 gap-3.5 p-0 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {visibleItems.map((item) => (
              <li key={item.id} className="relative">
                <FoodCard item={item} onSelect={() => navigate('/products/phoBoTai')} />
              </li>
            ))}
          </ul>
        ) : !loading ? (
          <p role="status" className="rounded-card bg-sand p-6 text-center text-muted">
            Nothing matches your search yet.
          </p>
        ) : null}
      </div>

    </div>
  );
}
