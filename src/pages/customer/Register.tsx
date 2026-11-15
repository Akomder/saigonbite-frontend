import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { BowlLogo } from '../../components/icons';
import { ScreenLayout } from '../../components/layout';
import { Button, Field, Notice, Segmented } from '../../components/ui';

const roles = ['Local customer', 'Tourist'] as const;
type Role = (typeof roles)[number];

interface RegisterProps {
  role: Role;
}

const roleRoutes: Record<Role, string> = {
  'Local customer': '/register',
  Tourist: '/register'
};

function Register({ role }: RegisterProps) {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const isLocal = role === 'Local customer';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <ScreenLayout title="Create account" width="wide">
      <div className="grid grid-cols-1 overflow-hidden rounded-card border border-line bg-white lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:rounded-frame">
        <aside className="hidden flex-col justify-center gap-4 bg-gradient-to-b from-blue to-navy p-10 text-white lg:flex">
          <BowlLogo size={72} className="text-white" />
          <h2 className="m-0 font-display text-3xl font-semibold">Hungry already?</h2>
          <p className="m-0 text-tint">
            Register once and order from any SaigonBite hub within 7 km of you. Tourists get English menus and can pay
            with a foreign card.
          </p>
        </aside>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5 sm:p-8" noValidate>
          <Segmented
            label="Account type"
            options={roles}
            value={role}
            onChange={(next) => navigate(roleRoutes[next])}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {isLocal ? (
              <>
                <Field label="Full name" name="fullName" autoComplete="name" defaultValue="Linh Nguyen" />
                <Field
                  label="Vietnamese mobile number"
                  name="mobile"
                  type="tel"
                  autoComplete="tel"
                  defaultValue="+84 90 123 4567"
                />
                <Field label="Password" name="password" type="password" autoComplete="new-password" defaultValue="password" />
                <Field
                  label="Delivery address"
                  name="address"
                  autoComplete="street-address"
                  defaultValue="12 Nguyen Hue, District 1, HCMC"
                />
              </>
            ) : (
              <>
                <Field label="Full name" name="fullName" autoComplete="name" defaultValue="Emma Johnson" />
                <Field label="Passport number" name="passport" defaultValue="X1234567" />
                <Field label="Email" name="email" type="email" autoComplete="email" defaultValue="emma.johnson@mail.com" />
                <Field
                  label="Hotel / delivery address"
                  name="address"
                  autoComplete="street-address"
                  defaultValue="Hotel Majestic, 1 Dong Khoi, D1"
                />
              </>
            )}
          </div>
          <Notice>
            {isLocal
              ? 'Your address and phone number are private. Only your hub and shipper see them for an active order.'
              : 'Menus are shown in English. Pay online with a foreign card or choose cash on delivery.'}
          </Notice>
          {submitted ? (
            <p role="status" className="m-0 rounded-xl bg-success-wash px-3.5 py-2.5 text-sm font-medium text-success">
              Account created. You can start ordering.
            </p>
          ) : null}
          <Button type="submit">Register</Button>
        </form>
      </div>
    </ScreenLayout>
  );
}

export function RegisterLocal() {
  return <Register role="Local customer" />;
}

export function RegisterTourist() {
  return <Register role="Tourist" />;
}
