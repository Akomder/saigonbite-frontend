import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SearchIcon, SlidersIcon, UserIcon } from '../../components/icons';
import { ErrorBanner, FoodCard, Skeleton } from '../../components/ui';
import { menuService } from '../../services/menuService';
import type { FoodItem } from '../../types';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [items,setItems]=useState<FoodItem[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
  useEffect(()=>{let active=true;menuService.getFeaturedItems().then(data=>{if(active)setItems(data);}).catch(()=>{if(active)setError('The menu could not be loaded. Please try again.');}).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[]);
  useEffect(() => { const term = (location.state as { query?: string } | null)?.query; if (term) setQuery(term); }, [location.state]);

  const visibleItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    return items.filter(
      (item) =>
        (term === '' || item.name.toLowerCase().includes(term) || item.brand.toLowerCase().includes(term))
    );
  }, [query,items]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 content-start gap-5 px-[19px] pb-6 pt-[22px] sm:px-6 sm:py-8 lg:grid-cols-12 lg:gap-6 lg:px-8">
        <div className="flex items-start justify-between gap-3 lg:col-span-8">
          <div className="pt-[34px]">
            <h1 className="m-0 whitespace-nowrap text-[clamp(2rem,10.5vw,2.8125rem)] font-extrabold leading-[1.2] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl">SAIGONBITE</h1>
            <p className="mt-0 text-[clamp(14px,4.2vw,18px)] leading-[27px] text-[#6a6a6a] sm:text-base">Vietnamese cloud-kitchen food, delivered</p>
          </div>
          <Link
            to="/profile"
            aria-label="Your profile"
            className="grid size-[60px] max-[400px]:size-[52px] shrink-0 place-items-center rounded-[20px] bg-tint text-navy transition-colors hover:bg-navy-wash"
          >
            <UserIcon size={26} />
          </Link>
        </div>

        <aside className="glass-panel hidden self-stretch p-6 lg:col-span-4 lg:row-span-3 lg:flex lg:flex-col lg:justify-between">
          <div><p className="m-0 text-xs font-semibold uppercase tracking-[.16em] text-blue">SaigonBite nearby</p><h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink">A good meal is closer than you think.</h2><p className="mt-3 text-sm leading-6 text-muted">Choose a nearby hub to see its live kitchen load, delivery distance, and available menu.</p></div>
          <div className="mt-8 grid gap-3"><Link to="/hubs" className="glass-interactive inline-flex min-h-12 rounded-full items-center justify-center bg-navy px-5 text-sm font-semibold text-white">Explore nearby hubs</Link><Link to="/orders" className="rounded-full px-4 py-3 text-center text-sm font-semibold text-navy transition-colors hover:bg-white/60">Track an order</Link></div>
        </aside>

        <form role="search" onSubmit={(event) => event.preventDefault()} className="flex gap-3 md:max-w-xl lg:col-span-8">
          <label className="flex h-[60px] min-w-0 flex-1 items-center gap-5 rounded-[20px] bg-white px-5 text-placeholder shadow-[0_4px_19px_rgba(0,0,0,.15)] focus-within:ring-2 focus-within:ring-blue/50">
            <SearchIcon size={20} />
            <span className="sr-only">Search food or brand</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-placeholder"
            />
          </label>
          <button
            type="button"
            aria-label="Filters"
            onClick={() => navigate('/hubs')}
            className="grid size-[60px] shrink-0 place-items-center rounded-[20px] bg-navy text-white transition-colors hover:bg-blue active:scale-95"
          >
            <SlidersIcon size={20} />
          </button>
        </form>

        <div className="-mx-[19px] mt-5 flex gap-3 overflow-x-auto px-[19px] py-1 md:mx-0 md:px-0 lg:col-span-8 lg:mt-0" aria-label="Food categories">{['All','Pho','Banh Mi','Salad'].map((category,index)=><button key={category} type="button" onClick={()=>navigate('/hubs')} className={`glass-interactive h-[50px] shrink-0 rounded-[20px] px-7 text-sm font-medium underline-offset-2 transition-all duration-200 ease-out ${index===0?'bg-navy text-white shadow-[0_10px_18px_-1px_rgba(0,0,0,.25)]':'glass-pill text-muted'}`}>{category}</button>)}</div>
        {error&&<div className="lg:col-span-8"><ErrorBanner>{error}</ErrorBanner></div>}{loading&&<div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-3 lg:col-span-8 lg:mt-0 lg:grid-cols-3" aria-label="Loading menu">{[0,1,2].map(item=><Skeleton key={item} className="h-[225px] rounded-[20px]" />)}</div>}

        {!loading&&visibleItems.length > 0 ? (
          <ul className="m-0 mt-4 grid list-none grid-cols-2 gap-x-5 gap-y-7 p-0 md:grid-cols-3 lg:col-span-8 lg:mt-0 lg:grid-cols-3 lg:gap-5">
            {visibleItems.map((item) => (
              <li key={item.id} className="relative">
                <FoodCard item={item} onSelect={() => navigate('/hubs')} />
              </li>
            ))}
          </ul>
        ) : !loading ? (
          <p role="status" className="rounded-card bg-sand p-6 text-center text-muted lg:col-span-8">
            Nothing matches your search yet.
          </p>
        ) : null}
      </div>

    </div>
  );
}
