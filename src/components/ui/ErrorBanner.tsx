import type { ReactNode } from 'react';
export function ErrorBanner({ children }: { children: ReactNode }) { return <div role="alert" className="rounded-xl border border-danger/20 bg-danger-wash px-4 py-3 text-sm font-medium text-danger">{children}</div>; }
