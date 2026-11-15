import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useFocusTrap } from '../../hooks/useFocusTrap';
export function Drawer({open,onClose,title,children}:{open:boolean;onClose:()=>void;title:string;children:ReactNode}){const ref=useRef<HTMLDivElement>(null);useEscapeKey(open,onClose);useFocusTrap(open,ref);if(!open)return null;return <div className="fixed inset-0 z-50 bg-ink/35 backdrop-blur-[8px]" onMouseDown={onClose}><section ref={ref} role="dialog" aria-modal="true" aria-label={title} onMouseDown={event=>event.stopPropagation()} className="glass-panel absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl p-5 shadow-2xl md:inset-y-0 md:left-auto md:right-0 md:w-full md:max-w-md md:rounded-none">{children}</section></div>;}
