import { FormEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import backendApi from '../../api/app-api';
import TLocation from '../../types/location';

import styles from './password.module.css';

function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [restoreError, setRestoreError] = useState('');
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const forgotPasswordPath = '/forgot-password';
    if ((location as TLocation).state?.from?.pathname !== forgotPasswordPath) {
      navigate(forgotPasswordPath, { replace: true });
    }
  }, [location, navigate]);

  const restorePasswrod = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setRestoreError('');
      await backendApi.newPasword({ password, token });
      navigate('/login');
    } catch (err) {
      setRestoreError('Не удалось обновить пароль');
    }
  };

  return (
    <>
      <form className={`${styles.main} pt-20`} onSubmit={restorePasswrod}>
        <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>

        {/* New Password */}
        <div className="pb-6">
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
          />
        </div>

        {/* Код из письма */}
        <div className="pb-6">
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={(e) => setToken(e.target.value)}
            value={token}
            name="token"
            size="default"
            error={!!restoreError}
            errorText={restoreError}
          />
        </div>

        <Button type="primary" size="medium" htmlType="submit">
          Сохранить
        </Button>
      </form>

      <div className={`${styles.main} pt-20`}>
        <p className="text text_type_main-default">
          Вспомнили пароль?
          <Link to="/login" className={styles.link}>
            {' '}
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}

export default ResetPassword;
