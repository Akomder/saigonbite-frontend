import { Navigate, Route, Routes } from 'react-router-dom';
import { CustomerLayout } from './layouts/CustomerLayout';
import { RestaurantLayout } from './layouts/RestaurantLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { customerRoutes, restaurantRoutes } from './routes';
import { AppProvider } from './state/AppState';

export default function App() {
  return <AppProvider><Routes>
    <Route element={<AuthLayout />}><Route path="/login" element={<Navigate to="/" replace />} /><Route path="/register" element={<Navigate to="/" replace />} /></Route>
    <Route element={<CustomerLayout />}>{customerRoutes.map(({ path, component: Page }) => <Route key={path} path={path} element={<Page />} />)}</Route>
    <Route element={<RestaurantLayout />}>{restaurantRoutes.map(({ path, component: Page }) => <Route key={path} path={path} element={<Page />} />)}</Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></AppProvider>;
}
