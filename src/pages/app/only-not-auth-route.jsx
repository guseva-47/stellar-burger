import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserName } from '../../services/selectors/auth';

function OnlyNotAuthRoute() {
  const auth = useSelector(getUserName);

  const location = useLocation();

  return auth ? <Navigate to={location.state.from?.pathname ?? '/'} /> : <Outlet />;
}

export default OnlyNotAuthRoute;
