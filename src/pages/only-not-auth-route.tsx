import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/use-store';
import { getUserName } from '../services/auth/auth.selector';
import TLocation from '../types/location';

function OnlyNotAuthRoute() {
  const auth = useAppSelector(getUserName);

  const location = useLocation();

  return auth ? <Navigate to={(location as TLocation).state?.from?.pathname ?? '/'} /> : <Outlet />;
}

export default OnlyNotAuthRoute;
