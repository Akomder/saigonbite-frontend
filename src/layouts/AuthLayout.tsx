import { Link, Outlet, useLocation } from "react-router-dom";
import { BowlLogo } from "../components/icons";

function DishIllustration() {
  return (
    <svg
      viewBox="0 0 520 420"
      role="img"
      aria-label="Illustration of a bowl of Vietnamese noodles"
      className="relative z-10 w-full drop-shadow-[0_32px_34px_rgba(11,31,45,.28)]"
    >
      <defs>
        <linearGradient
          id="bowl"
          x1="115"
          x2="410"
          y1="210"
          y2="364"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f7eee0" />
          <stop offset="1" stopColor="#d5b99b" />
        </linearGradient>
        <linearGradient
          id="broth"
          x1="127"
          x2="386"
          y1="155"
          y2="258"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e4a25d" />
          <stop offset="1" stopColor="#a84d2e" />
        </linearGradient>
        <linearGradient
          id="table"
          x1="30"
          x2="470"
          y1="290"
          y2="400"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e9c690" />
          <stop offset="1" stopColor="#b97144" />
        </linearGradient>
      </defs>
      <ellipse
        cx="262"
        cy="353"
        rx="208"
        ry="39"
        fill="#132f3c"
        fillOpacity=".18"
      />
      <path
        d="M67 300h390l-35 64c-9 17-25 27-44 27H147c-19 0-35-10-44-27l-36-64Z"
        fill="url(#table)"
        opacity=".9"
      />
      <ellipse cx="260" cy="298" rx="202" ry="58" fill="#fff4e4" />
      <path
        d="M75 296c12 81 77 130 185 130s173-49 185-130H75Z"
        fill="url(#bowl)"
      />
      <ellipse cx="260" cy="286" rx="183" ry="53" fill="#f9e3c1" />
      <ellipse cx="260" cy="277" rx="163" ry="43" fill="url(#broth)" />
      <path
        d="M147 274c21-34 59 28 91-3s58-24 85 3 55 15 74-7"
        fill="none"
        stroke="#fff0c8"
        strokeLinecap="round"
        strokeWidth="8"
      />
      <path
        d="M170 286c22-27 42 15 66-5s55-26 80 1 44 21 67-1"
        fill="none"
        stroke="#f3d8a1"
        strokeLinecap="round"
        strokeWidth="6"
      />
      <path
        d="m188 240 139-157M208 245 353 92"
        stroke="#5a3929"
        strokeLinecap="round"
        strokeWidth="8"
      />
      <path
        d="M197 257c-9-25-4-45 15-57 15 20 16 37-1 54M312 249c11-29 31-41 60-34-7 26-24 39-54 40"
        fill="#4f7953"
      />
      <path
        d="M232 252c-4-25 4-42 24-50 13 21 11 38-8 54M329 258c2-21 13-34 37-38 5 21-4 35-29 44"
        fill="#78925d"
      />
      <circle cx="151" cy="280" r="9" fill="#d94e32" />
      <circle cx="350" cy="267" r="7" fill="#d94e32" />
      <circle cx="280" cy="300" r="6" fill="#f4c65f" />
      <path
        d="M69 295c0-32 86-58 191-58s191 26 191 58-86 58-191 58S69 327 69 295Z"
        fill="none"
        stroke="#fff5e7"
        strokeWidth="14"
      />
    </svg>
  );
}

export function AuthLayout() {
  const { pathname } = useLocation();
  const isRegister = pathname === "/register";
  return (
    <div className="auth-fullscreen relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-8">
      <div
        className="auth-mesh pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <header className="absolute left-1/2 top-5 z-20 -translate-x-1/2 md:left-8 md:top-6 md:translate-x-0">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 whitespace-nowrap text-white drop-shadow-[0_2px_10px_rgba(3,21,32,.3)]"
        >
          <BowlLogo size={38} />
          <span className="font-display text-lg font-bold tracking-[.08em] sm:text-xl">
            SAIGONBITE
          </span>
        </Link>
      </header>

      <div
        className="pointer-events-none absolute bottom-4 left-5 hidden w-[230px] opacity-55 drop-shadow-[0_24px_30px_rgba(3,18,29,.3)] lg:block xl:left-8 xl:w-[310px] 2xl:w-[380px]"
        aria-hidden="true"
      >
        <div className="auth-dish-glow absolute inset-[12%] rounded-full" />
        <DishIllustration />
      </div>
      <div className="glass-pill auth-float-one absolute left-8 top-[23%] z-10 hidden items-center gap-3 px-4 py-3 text-white xl:flex">
        <span className="grid size-9 place-items-center rounded-full bg-white/15 text-lg">
          ⌁
        </span>
        <span>
          <strong className="block text-sm">Close to the good stuff</strong>
          <small className="text-white/85">Neighborhood kitchens</small>
        </span>
      </div>
      <div className="glass-pill auth-float-two absolute bottom-[18%] right-8 z-10 hidden items-center gap-3 px-4 py-3 text-white xl:flex">
        <span className="grid size-9 place-items-center rounded-full bg-amber/20 text-lg text-amber-100">
          ✦
        </span>
        <span>
          <strong className="block text-sm">Made fresh for you</strong>
          <small className="text-white/85">Saigon flavors, every day</small>
        </span>
      </div>

      <main className="auth-glass-card relative z-10 my-auto w-full max-w-[440px] p-5 sm:p-7">
        <div className="mb-5 text-center lg:hidden">
          <p className="m-0 font-display text-xl font-semibold text-ink">
            A little taste of Saigon.
          </p>
          <p className="mb-0 mt-1 text-sm text-muted">
            Your neighborhood favorites, delivered.
          </p>
        </div>
        <nav
          className="auth-segment-track mb-5 grid grid-cols-2 gap-1.5 p-1.5"
          aria-label="Account access"
        >
          <Link
            to="/login"
            aria-current={!isRegister ? "page" : undefined}
            className={`rounded-full px-4 py-2.5 text-center text-sm font-semibold transition-all duration-300 ease-out ${!isRegister ? "auth-segment-active" : "text-muted hover:bg-white/50"}`}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            aria-current={isRegister ? "page" : undefined}
            className={`rounded-full px-4 py-2.5 text-center text-sm font-semibold transition-all duration-300 ease-out ${isRegister ? "auth-segment-active" : "text-muted hover:bg-white/50"}`}
          >
            Create Account
          </Link>
        </nav>
        <Outlet />
        <p className="mb-0 mt-5 text-center text-[11px] leading-[1.45] text-muted">
          By continuing, you agree to SaigonBite’s terms and privacy policy.
        </p>
      </main>

      <footer className="pointer-events-none absolute inset-x-3 bottom-4 z-20 text-center text-[10px] leading-4 text-white/60 sm:text-xs">
        © SaigonBite · Developed by MOUNTHADY SOUK AKHOM &amp; DANG DOAN MINH
        TAN
      </footer>
    </div>
  );
}
