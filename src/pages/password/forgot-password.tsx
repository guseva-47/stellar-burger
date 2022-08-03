import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import backendApi from '../../api/app-api';

import styles from './password.module.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const location = useLocation();

  const navigate = useNavigate();

  const restorePasswrod = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setEmailError('');
      await backendApi.resetPasword(email);
      navigate('/reset-password', { state: { from: location } });
    } catch (err) {
      setEmailError('Не удалось сбросить пароль');
    }
  };

  return (
    <>
      <form className={`${styles.main} pt-20`} onSubmit={restorePasswrod}>
        <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>

        {/* Email */}
        <div className="pb-6">
          <Input
            type="email"
            placeholder="Укажите e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            size="default"
            error={!!emailError}
            errorText={emailError}
          />
        </div>
        <Button type="primary" size="medium" htmlType="submit">
          Восстановить
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

export default ForgotPassword;
