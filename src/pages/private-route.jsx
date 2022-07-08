import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserName } from '../services/selectors/auth';

function PrivateRoute() {
  const auth = useSelector(getUserName);
  const location = useLocation();

  return auth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
}

export default PrivateRoute;
