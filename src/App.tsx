import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout';
import { defaultPath, screenGroups } from './routes';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        {screenGroups.flatMap((group) =>
          group.screens.map((screen) => {
            const Screen = screen.component;
            return <Route key={`${group.id}/${screen.id}`} path={`/${group.id}/${screen.id}`} element={<Screen />} />;
          })
        )}
        <Route path="*" element={<Navigate to={defaultPath} replace />} />
      </Route>
    </Routes>
  );
}
