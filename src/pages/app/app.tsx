import { useCallback, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import ConstructorPage from '../constructor/constructor-page';
import ForgotPassword from '../password/forgot-password';
import LoginPage from '../login/login-page';
import NotFound404 from '../not-found404/not-found404';
import RegisterPage from '../register/register';
import ResetPassword from '../password/reset-password';
import Layout from './layout';
import ProfileLayout from '../profile/profile-layout';
import Orders from '../profile/orders';
import Profile from '../profile/profile';
import PrivateRoute from '../private-route';
import OnlyNotAuthRoute from '../only-not-auth-route';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { fetchGetItems } from '../../services/redusers/app';
import Modal from '../../components/modal/modal';
import ProfileEditor from '../profile/profile-editor';
import { getUser } from '../../services/redusers/auth';
import TLocation from '../../types/location';
import { useAppDispatch } from '../../hooks/use-store';
import Feed from '../feed/feed';
import Order from '../order/order';

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation() as TLocation;

  useEffect(() => {
    dispatch(fetchGetItems());
    dispatch(getUser());
  }, [dispatch]);

  const navigate = useNavigate();
  const modalCloseHandler = useCallback(() => navigate(-1), [navigate]);

  return (
    <>
      <Routes location={location.state?.backgroundLocation || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<ConstructorPage />} />
          <Route path="login" element={<OnlyNotAuthRoute />}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route path="register" element={<OnlyNotAuthRoute />}>
            <Route index element={<RegisterPage />} />
          </Route>
          <Route path="forgot-password" element={<OnlyNotAuthRoute />}>
            <Route index element={<ForgotPassword />} />
          </Route>
          <Route path="reset-password" element={<OnlyNotAuthRoute />}>
            <Route index element={<ResetPassword />} />
          </Route>
          <Route path="feed">
            <Route index element={<Feed />} />
            <Route path=":id" element={<Order />} />
          </Route>
          <Route path="profile" element={<PrivateRoute />}>
            <Route element={<ProfileLayout />}>
              <Route index element={<Profile />} />
              <Route path="edit" element={<ProfileEditor />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Route>
          <Route path="ingredients/:id" element={<IngredientDetails />} />

          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>

      {location.state?.backgroundLocation && (
        <Routes>
          <Route
            path="ingredients/:id"
            element={<Modal title="Детали ингредиента" closeHandler={modalCloseHandler} />}
          >
            <Route index element={<IngredientDetails />} />
          </Route>

          <Route path="feed/:id" element={<Modal closeHandler={modalCloseHandler} />}>
            <Route index element={<Order />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
