import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, LockIcon, UserCircleIcon } from '../../components/icons';
import { ErrorBanner } from '../../components/ui';
import { useAuth } from '../../state/AuthState';

type LoginErrors = { username?: string; password?: string };

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const staffMode = searchParams.get('role') === 'staff';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function validate(values = { username, password }) {
    const next: LoginErrors = {};
    if (!values.username.trim()) next.username = 'Enter your username.';
    if (!values.password) next.password = 'Enter your password.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!validate()) return;
    setBusy(true);
    try {
      const user = await login(username.trim(), password);
      const next = (location.state as { from?: string } | null)?.from;
      navigate(
        next ||
          (user.role === 'customer'
            ? '/'
            : user.role === 'admin'
              ? '/admin/vouchers'
              : user.role === 'manager'
                ? '/manager/reports'
                : '/restaurant/kitchen-orders'),
        { replace: true },
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to sign in.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section aria-labelledby="login-title">
      <div className="mb-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-blue">
          {staffMode ? "Restaurant & kitchen partners" : "Welcome back"}
        </p>
        <h1
          id="login-title"
          className="m-0 font-display text-[27px] font-semibold leading-tight tracking-[-.025em] text-ink sm:text-3xl"
        >
          {staffMode ? "Partner sign in" : "Sign in to SaigonBite"}
        </h1>
        <p className="mb-0 mt-2 text-sm leading-6 text-muted">
          {staffMode
            ? "Use your restaurant or staff account to manage the kitchen."
            : "Your favorite Saigon kitchens are just around the corner."}
        </p>
      </div>

      {error && (
        <div className="auth-field-message mb-5">
          <ErrorBanner>{error}</ErrorBanner>
        </div>
      )}

      <form noValidate className="grid gap-4" onSubmit={submit}>
        <div>
          <label
            htmlFor="login-username"
            className="mb-1.5 block text-[13px] font-semibold text-ink"
          >
            Username
          </label>
          <div
            className={`auth-input-shell flex items-center gap-3 px-3.5 ${errors.username ? "auth-invalid border-danger" : ""}`}
          >
            <UserCircleIcon size={19} className="shrink-0 text-muted" />
            <input
              id="login-username"
              name="username"
              type="text"
              autoComplete="username"
              maxLength={40}
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setErrors((current) => ({ ...current, username: undefined }));
              }}
              onBlur={() =>
                username.trim()
                  ? setErrors((current) => ({
                      ...current,
                      username: undefined,
                    }))
                  : setErrors((current) => ({
                      ...current,
                      username: "Enter your username.",
                    }))
              }
              aria-invalid={Boolean(errors.username)}
              aria-describedby={
                errors.username ? "login-username-error" : undefined
              }
              placeholder="Your username"
              className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-ink outline-none placeholder:text-muted/65"
            />
          </div>
          {errors.username && (
            <p
              id="login-username-error"
              className="auth-field-message mb-0 mt-1.5 text-xs font-medium text-danger"
            >
              {errors.username}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="login-password"
            className="mb-1.5 block text-[13px] font-semibold text-ink"
          >
            Password
          </label>
          <div
            className={`auth-input-shell flex items-center gap-3 px-3.5 ${errors.password ? "auth-invalid border-danger" : ""}`}
          >
            <LockIcon size={19} className="shrink-0 text-muted" />
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((current) => ({ ...current, password: undefined }));
              }}
              onBlur={() =>
                password
                  ? setErrors((current) => ({
                      ...current,
                      password: undefined,
                    }))
                  : setErrors((current) => ({
                      ...current,
                      password: "Enter your password.",
                    }))
              }
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "login-password-error" : undefined
              }
              placeholder="Your password"
              className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-ink outline-none placeholder:text-muted/65"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-navy/5 hover:text-navy"
            >
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
          {errors.password && (
            <p
              id="login-password-error"
              className="auth-field-message mb-0 mt-1.5 text-xs font-medium text-danger"
            >
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={busy}
          className="auth-submit mt-2 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[16px] px-5 text-[15px] font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
        >
          {busy && (
            <span
              aria-hidden="true"
              className="size-[18px] animate-spin rounded-full border-2 border-white/35 border-t-white"
            />
          )}
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mb-0 mt-5 text-center text-sm text-muted">
        {staffMode ? "Ordering as a customer?" : "Kitchen or partner staff?"}{" "}
        <Link
          className="font-semibold text-navy underline decoration-navy/30 underline-offset-4"
          to={staffMode ? "/login" : "/login?role=staff"}
        >
          {staffMode ? "Customer sign in" : "Staff sign in"}
        </Link>
      </p>
    </section>
  );
}
