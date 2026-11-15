import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useId } from 'react';
import { defaultPath, screenGroups } from '../../routes';
import { useDisclosure } from '../../hooks/useDisclosure';
import { MobileDrawer } from './MobileDrawer';
import { Navbar } from './Navbar';
import { ScreenNav } from './ScreenNav';

export function AppShell() {
  const drawer = useDisclosure();
  const drawerId = useId();
  const location = useLocation();

  useEffect(() => {
    drawer.close();
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar drawerId={drawerId} drawerOpen={drawer.isOpen} onMenuClick={drawer.open} homePath={defaultPath} />
      <MobileDrawer id={drawerId} isOpen={drawer.isOpen} onClose={drawer.close} title="Screens">
        <ScreenNav groups={screenGroups} onNavigate={drawer.close} />
      </MobileDrawer>
      <div className="flex flex-1">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto border-r border-line bg-white p-4 lg:block xl:w-80">
          <ScreenNav groups={screenGroups} />
        </aside>
        <main id="content" className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
