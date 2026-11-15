import { NavLink } from 'react-router-dom';
import type { ScreenGroup } from '../../types';
import { cn } from '../../utils/cn';

export interface ScreenNavProps {
  groups: ScreenGroup[];
  onNavigate?: () => void;
}

const bannerClasses: Record<ScreenGroup['id'], string> = {
  customer: 'bg-navy',
  restaurant: 'bg-blue'
};

export function ScreenNav({ groups, onNavigate }: ScreenNavProps) {
  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => {
        const headingId = `nav-${group.id}`;
        return (
          <nav key={group.id} aria-labelledby={headingId} className="flex flex-col gap-1">
            <div className={cn('mb-2 rounded-card px-4 py-3.5 text-white', bannerClasses[group.id])}>
              <h2 id={headingId} className="m-0 font-display text-lg font-semibold">
                {group.title}
              </h2>
              <p className="mt-1 text-xs text-cream">{group.subtitle}</p>
            </div>
            <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
              {group.screens.map((screen) => (
                <li key={screen.id}>
                  <NavLink
                    to={`/${group.id}/${screen.id}`}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150',
                        isActive ? 'bg-navy-wash text-navy' : 'text-muted hover:bg-sand hover:text-ink'
                      )
                    }
                  >
                    {screen.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        );
      })}
    </div>
  );
}
