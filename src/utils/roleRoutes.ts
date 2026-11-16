import type { UserRole } from '../types/domain';

export function roleHomePath(role: UserRole): string {
  switch (role) {
    case 'customer': return '/';
    case 'kitchen': return '/restaurant/kitchen-orders';
    case 'driver': return '/driver';
    case 'admin': return '/admin/vouchers';
    case 'manager': return '/manager/reports';
  }
}
