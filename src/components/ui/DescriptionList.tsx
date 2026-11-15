import type { ReactNode } from 'react';

export function DescriptionList({ children }: { children: ReactNode }) {
  return <dl className="m-0 flex flex-col gap-2">{children}</dl>;
}
