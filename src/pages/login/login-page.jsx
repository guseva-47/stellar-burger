import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login-page.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <form className={`${styles.main} pt-20`}>
        <h2 className="text text_type_main-medium pb-6">Вход</h2>

        {/* Email */}
        <div className="pb-6">
          <Input
            type="email"
            autocomplete="usernameдля"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            error={false}
            size="default"
          />
        </div>

        {/* Password */}
        <div className="pb-6">
          <PasswordInput
            autocomplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
          />
        </div>

        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>

      <div className={`${styles.main} pt-20`}>
        <p className="text text_type_main-default pb-4">
          Вы — новый пользователь?
          <Link to="/register" className={styles.link}>
            {' '}
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default">
          Забыли пароль?
          <Link to="/forgot-password" className={styles.link}>
            {' '}
            Восстановить пароль
          </Link>
        </p>
      </div>
    </>
  );
}

export default LoginPage;