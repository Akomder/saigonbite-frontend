import type {ReactNode} from 'react';
import {Navigate,useLocation} from 'react-router-dom';
import type {UserRole} from '../../types/domain';
import {useAuth,hasRole,roleHomePath} from '../../state/AuthState';
export function RequireRole({roles,children}:{roles:UserRole[];children:ReactNode}){const{user,loading}=useAuth();const location=useLocation();if(loading)return <div className="mx-auto max-w-5xl p-8" role="status">Checking your session…</div>;if(!user)return <Navigate to="/login" replace state={{from:location.pathname}}/>;if(!hasRole(user,roles))return <Navigate to={roleHomePath(user.role)} replace/>;return <>{children}</>;}
