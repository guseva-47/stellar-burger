import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './password.module.css';
import backendApi from '../../api/backend-api';

function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [restoreError, setRestoreError] = useState('');

  const restorePasswrod = async (e) => {
    e.preventDefault();
    try {
      await backendApi.newPasword({ password, token });
    } catch (err) {
      setRestoreError('Не удалось обновить пароль');
    }
  };

  return (
    <>
      <form className={`${styles.main} pt-20`}>
        <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>

        {/* New Password */}
        <div className="pb-6">
          <PasswordInput
            autocomplete="new-password"
            placeholder="Введите новый пароль"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
          />
        </div>

        {/* Код из письма */}
        <div className="pb-6">
          <Input
            type="text"
            autocomplete="text"
            placeholder="Введите код из письма"
            onChange={(e) => setToken(e.target.value)}
            value={token}
            name="token"
            size="default"
            error={!!restoreError}
            errorText={restoreError}
          />
        </div>

        <Button type="primary" size="medium" htmlType="submit" onClick={restorePasswrod}>
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
