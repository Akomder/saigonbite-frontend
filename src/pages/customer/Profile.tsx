import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRightIcon, LogoutIcon, UserIcon } from '../../components/icons';
import { ActionStack, ScreenLayout } from '../../components/layout';
import { Button, Field, PhotoSlot } from '../../components/ui';

const links = [
  { id: 'savedAddresses', label: 'Saved addresses' },
  { id: 'orderHistory', label: 'Order history' }
];

export default function Profile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  return (
    <ScreenLayout title="Profile" width="default">
      <div className="overflow-hidden rounded-card border border-line bg-white">
        <div className="relative">
          <PhotoSlot className="h-40 w-full rounded-none bg-navy text-tint sm:h-52" />
          <div className="absolute -bottom-10 left-gutter grid size-20 place-items-center rounded-full border-4 border-white bg-tint text-navy">
            <UserIcon size={40} />
          </div>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setEditing(false);
          }}
          className="flex flex-col gap-4 px-gutter pb-gutter pt-14"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" defaultValue="Linh Nguyen" readOnly={!editing} />
            <Field label="Email" name="email" type="email" defaultValue="linh.nguyen@gmail.com" readOnly={!editing} />
            <Field
              label="Delivery address"
              name="address"
              defaultValue="12 Nguyen Hue, District 1, Ho Chi Minh City"
              readOnly={!editing}
            />
            <Field label="Password" name="password" type="password" defaultValue="password" readOnly={!editing} />
          </div>
          <ul className="m-0 grid grid-cols-1 list-none gap-3 p-0 sm:grid-cols-2">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => navigate(link.id === 'orderHistory' ? '/orders/receipt' : '/checkout/address')}
                  className="flex min-h-field w-full items-center justify-between rounded-field border border-line bg-white px-4 text-base font-medium transition-colors hover:bg-sand"
                >
                  <span>{link.label}</span>
                  <ChevronRightIcon size={20} />
                </button>
              </li>
            ))}
          </ul>
          <ActionStack row>
            {editing ? (
              <Button variant="dark" type="submit">
                Save profile
              </Button>
            ) : (
              <Button variant="dark" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            )}
            <Button variant="outline" onClick={() => navigate('/')}>
              <LogoutIcon size={18} />
              Log out
            </Button>
          </ActionStack>
        </form>
      </div>
    </ScreenLayout>
  );
}
