import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './password.module.css';
import backendApi from '../../api/backend-api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [hasRestored, setRestored] = useState(false);

  const restorePasswrod = async (e) => {
    e.preventDefault();
    try {
      await backendApi.resetPasword(email);
      setRestored(true);
    } catch (err) {
      console.error(err);
      setEmailError('Не удалось отправить запрос');
    }
  };

  return (
    <>
      <form className={`${styles.main} pt-20`}>
        <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>

        {/* Email */}
        <div className="pb-6">
          <Input
            type="email"
            autocomplete="username"
            placeholder="Укажите e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            size="default"
            error={!!emailError}
            errorText={emailError}
          />
        </div>

        {hasRestored ? (
          <Link to="/reset-password" className={styles.link}>
            <Button type="primary" size="medium">
              Далее
            </Button>
          </Link>
        ) : (
          <Button type="primary" size="medium" onClick={restorePasswrod} htmlType="submit">
            Восстановить
          </Button>
        )}
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
