import type { ReactNode } from 'react';
export function ErrorBanner({ children }: { children: ReactNode }) { return <div role="alert" className="glass-error rounded-xl px-4 py-3 text-sm font-medium text-danger">{children}</div>; }
