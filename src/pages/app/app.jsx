import { Route, Routes } from 'react-router-dom';
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
import PrivateRoute from './private-route';
import OnlyNotAuthRoute from './only-not-auth-route';

function App() {
  return (
    <Routes>
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
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  );
}

export default App;
