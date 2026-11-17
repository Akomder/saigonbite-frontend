import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, PhoneIcon, UserCircleIcon } from '../../components/icons';
import { ErrorBanner } from '../../components/ui';
import { useAuth } from '../../state/AuthState';
import type { CustomerType } from '../../types/domain';

type RegisterField = 'fullName' | 'username' | 'password' | 'phone' | 'email';
type RegisterErrors = Partial<Record<RegisterField, string>>;

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [customerType, setCustomerType] = useState<CustomerType>('local');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  function fieldMessage(field: RegisterField) {
    if (field === 'fullName') {
      if (!fullName.trim()) return 'Enter your full name.';
      if (fullName.trim().length > 80) return 'Name must be 80 characters or fewer.';
    }
    if (field === 'username') {
      if (!username.trim()) return 'Choose a username.';
      if (username.trim().length > 40) return 'Username must be 40 characters or fewer.';
    }
    if (field === 'password' && password.length < 8) return 'Use at least 8 characters.';
    if (field === 'phone' && phone && !/^[+\d][\d\s().-]{5,19}$/.test(phone.trim())) return 'Enter a valid phone number.';
    if (field === 'email') {
      if (customerType === 'tourist' && !email.trim()) return 'Enter your email address.';
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Enter a valid email address.';
    }
    return undefined;
  }

  function validate() {
    const next: RegisterErrors = {};
    const fields: RegisterField[] = ['fullName', 'username', 'password', 'phone', 'email'];
    for (const field of fields) {
      const message = fieldMessage(field);
      if (message) next[field] = message;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!validate()) return;
    setBusy(true);
    try {
      await register({ username: username.trim(), password, fullName: fullName.trim(), customerType, phone: phone.trim() || undefined, email: email.trim() || undefined });
      navigate('/', { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to create your account.');
    } finally {
      setBusy(false);
    }
  }

  function fieldError(name: RegisterField) {
    return errors[name] ? <p id={`register-${name}-error`} className="auth-field-message mb-0 mt-1.5 text-xs font-medium text-danger">{errors[name]}</p> : null;
  }

  return (
    <section aria-labelledby="register-title">
      <div className="mb-5">
        <h1 id="register-title" className="m-0 font-display text-[27px] font-semibold leading-tight tracking-[-.025em] text-ink sm:text-3xl">Create your account</h1>
      </div>

      <div className="glass-pill mb-5 grid grid-cols-2 gap-1 p-1" role="group" aria-label="Choose account type">
        {(['local', 'tourist'] as const).map(type => <button key={type} type="button" aria-pressed={customerType === type} onClick={() => { setCustomerType(type); setErrors(current => ({ ...current, phone: undefined, email: undefined })); }} className={`rounded-full px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 ease-out active:scale-[0.98] ${customerType === type ? 'bg-white text-navy shadow-sm' : 'text-muted hover:bg-white/50'}`}>{type === 'local' ? 'Local customer' : 'Foreign tourist'}</button>)}
      </div>

      {error && <div className="auth-field-message mb-5"><ErrorBanner>{error}</ErrorBanner></div>}

      <form noValidate onSubmit={submit} className="grid gap-3.5">
        <div>
          <label htmlFor="register-full-name" className="mb-1.5 block text-[13px] font-semibold text-ink">Full name</label>
          <div className={`auth-input-shell flex items-center gap-3 px-3.5 ${errors.fullName ? 'auth-invalid border-danger' : ''}`}><UserCircleIcon size={19} className="shrink-0 text-muted"/><input id="register-full-name" name="full_name" type="text" required autoComplete="name" maxLength={80} value={fullName} onChange={event => { setFullName(event.target.value); setErrors(current => ({ ...current, fullName: undefined })); }} onBlur={() => setErrors(current => ({ ...current, fullName: fieldMessage('fullName') }))} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'register-fullName-error' : undefined} placeholder="Your full name" className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-ink outline-none placeholder:text-muted/65"/></div>{fieldError('fullName')}
        </div>
        <div>
          <label htmlFor="register-username" className="mb-1.5 block text-[13px] font-semibold text-ink">Username</label>
          <div className={`auth-input-shell flex items-center gap-3 px-3.5 ${errors.username ? 'auth-invalid border-danger' : ''}`}><span className="w-[19px] shrink-0 text-center text-lg text-muted">@</span><input id="register-username" name="username" type="text" required autoComplete="username" maxLength={40} value={username} onChange={event => { setUsername(event.target.value); setErrors(current => ({ ...current, username: undefined })); }} onBlur={() => setErrors(current => ({ ...current, username: fieldMessage('username') }))} aria-invalid={Boolean(errors.username)} aria-describedby={errors.username ? 'register-username-error' : undefined} placeholder="Choose a username" className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-ink outline-none placeholder:text-muted/65"/></div>{fieldError('username')}
        </div>
        <div>
          <label htmlFor="register-password" className="mb-1.5 block text-[13px] font-semibold text-ink">Password</label>
          <div className={`auth-input-shell flex items-center gap-3 px-3.5 ${errors.password ? 'auth-invalid border-danger' : ''}`}><LockIcon size={19} className="shrink-0 text-muted"/><input id="register-password" name="password" type={showPassword ? 'text' : 'password'} required autoComplete="new-password" minLength={8} value={password} onChange={event => { setPassword(event.target.value); setErrors(current => ({ ...current, password: undefined })); }} onBlur={() => setErrors(current => ({ ...current, password: fieldMessage('password') }))} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'register-password-error' : undefined} placeholder="At least 8 characters" className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-ink outline-none placeholder:text-muted/65"/><button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-navy/5 hover:text-navy">{showPassword ? <EyeOffIcon size={18}/> : <EyeIcon size={18}/>}</button></div>{fieldError('password')}
        </div>

        {customerType === 'local' ? <div>
          <label htmlFor="register-phone" className="mb-1.5 block text-[13px] font-semibold text-ink">Vietnamese mobile number <span className="font-normal text-muted">(optional)</span></label>
          <div className={`auth-input-shell flex items-center gap-3 px-3.5 ${errors.phone ? 'auth-invalid border-danger' : ''}`}><PhoneIcon size={18} className="shrink-0 text-muted"/><input id="register-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={event => { setPhone(event.target.value); setErrors(current => ({ ...current, phone: undefined })); }} onBlur={() => setErrors(current => ({ ...current, phone: fieldMessage('phone') }))} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'register-phone-error' : 'register-phone-hint'} placeholder="+84 90 123 4567" className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-ink outline-none placeholder:text-muted/65"/></div>{fieldError('phone')}<p id="register-phone-hint" className="mb-0 mt-1.5 text-xs leading-5 text-muted">You can add your delivery district after creating your account.</p>
        </div> : <>
          <div>
            <label htmlFor="register-email" className="mb-1.5 block text-[13px] font-semibold text-ink">Email address</label>
            <div className={`auth-input-shell flex items-center gap-3 px-3.5 ${errors.email ? 'auth-invalid border-danger' : ''}`}><MailIcon size={19} className="shrink-0 text-muted"/><input id="register-email" name="email" type="email" required autoComplete="email" inputMode="email" value={email} onChange={event => { setEmail(event.target.value); setErrors(current => ({ ...current, email: undefined })); }} onBlur={() => setErrors(current => ({ ...current, email: fieldMessage('email') }))} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'register-email-error' : undefined} placeholder="name@example.com" className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-ink outline-none placeholder:text-muted/65"/></div>{fieldError('email')}
          </div>
          <div>
            <label htmlFor="register-tourist-phone" className="mb-1.5 block text-[13px] font-semibold text-ink">International phone <span className="font-normal text-muted">(optional)</span></label>
            <div className={`auth-input-shell flex items-center gap-3 px-3.5 ${errors.phone ? 'auth-invalid border-danger' : ''}`}><PhoneIcon size={18} className="shrink-0 text-muted"/><input id="register-tourist-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={event => { setPhone(event.target.value); setErrors(current => ({ ...current, phone: undefined })); }} onBlur={() => setErrors(current => ({ ...current, phone: fieldMessage('phone') }))} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'register-phone-error' : 'register-stay-hint'} placeholder="+1 555 123 4567" className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-ink outline-none placeholder:text-muted/65"/></div>{fieldError('phone')}<p id="register-stay-hint" className="mb-0 mt-1.5 text-xs leading-5 text-muted">Add your hotel or stay as a delivery address after sign up.</p>
          </div>
        </>}

        <button type="submit" disabled={busy} className="auth-submit mt-2 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[16px] px-5 text-[15px] font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] disabled:cursor-wait disabled:opacity-70">{busy && <span aria-hidden="true" className="size-[18px] animate-spin rounded-full border-2 border-white/35 border-t-white"/>}{busy ? 'Creating account...' : 'Create account'}</button>
      </form>
      <p className="mb-0 mt-5 text-center text-sm text-muted">Restaurant or kitchen partner?{' '}<Link className="font-semibold text-navy underline decoration-navy/30 underline-offset-4" to="/login?role=staff">Staff sign in</Link></p>
    </section>
  );
}

