import { Link } from 'react-router-dom';
import { BowlLogo } from '../../components/icons';
import { PhotoSlot } from '../../components/ui';

export default function SplashScreen() {
  return (
    <div className="grid grid-cols-1 min-h-[calc(100vh-4rem)] grid-rows-[1fr_auto] bg-gradient-to-b from-blue to-navy text-white lg:grid-cols-2 lg:grid-rows-1">
      <section className="flex flex-col items-center justify-center gap-5 px-gutter py-16 text-center lg:items-start lg:px-16 lg:text-left">
        <BowlLogo size={112} className="text-white" />
        <h1 className="m-0 font-display text-4xl font-bold tracking-[0.12em] sm:text-5xl lg:text-6xl">SAIGONBITE</h1>
        <p className="m-0 max-w-md text-base text-tint sm:text-lg">
          Vietnamese cloud-kitchen food, cooked at the hub nearest to you and delivered fresh.
        </p>
        <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
          <Link
            to="/register"
            className="inline-flex min-h-control flex-1 items-center justify-center rounded-control bg-white px-5 font-semibold text-navy transition-colors hover:bg-cream active:bg-tint"
          >
            Create account
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-control flex-1 items-center justify-center rounded-control border border-white/70 px-5 font-semibold text-white transition-colors hover:bg-white/10 active:bg-white/20"
          >
            Browse food
          </Link>
        </div>
      </section>
      <PhotoSlot className="h-72 w-full rounded-none bg-white/15 text-white lg:h-auto" />
    </div>
  );
}
