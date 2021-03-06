import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // todo
    // @ts-ignore
    dispatch(fetchGetItems());
    // todo
    // @ts-ignore
    dispatch(getUser());
  }, [dispatch]);

  const navigate = useNavigate();
  const modalCloseHandler = useCallback(() => navigate(-1), [navigate]);

  return (
    <>
      <Routes location={(location as TLocation).state?.backgroundLocation || location}>
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
          <Route path="profile" element={<PrivateRoute />}>
            <Route element={<ProfileLayout />}>
              <Route index element={<Profile />} />
              <Route path="edit" element={<ProfileEditor />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Route>
          <Route path="/ingredients/:id" element={<IngredientDetails />} />

          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>

      {(location as TLocation).state?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={<Modal title="???????????? ??????????????????????" closeHandler={modalCloseHandler} />}
          >
            <Route index element={<IngredientDetails />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
