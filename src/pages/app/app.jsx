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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ConstructorPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="profile" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  );
}

export default App;
