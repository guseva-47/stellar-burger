import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/use-store';
import { getUserName } from '../services/selectors/auth';

function PrivateRoute() {
  const auth = useAppSelector(getUserName);
  const location = useLocation();

  return auth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
}

export default PrivateRoute;
