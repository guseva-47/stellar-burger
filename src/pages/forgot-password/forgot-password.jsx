import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './forgot-password.module.css';

function ForgotPassword() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          />
        </div>

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
            onChange={(e) => setCode(e.target.value)}
            value={code}
            name="code"
            size="default"
          />
        </div>

        <Button type="primary" size="medium">
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

export default ForgotPassword;
