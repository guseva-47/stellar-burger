import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { login } from '../../services/redusers/auth';
import { isLoginFailed, loginErrorMessage } from '../../services/selectors/auth';

import styles from './login-page.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidForm = email && password.length >= 6;

  const dispatch = useDispatch();

  const [loginError, setLoginError] = useState('');
  const isFailed = useSelector(isLoginFailed);
  const errMsg = useSelector(loginErrorMessage);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // todo
    // @ts-ignore
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isFailed) {
      setLoginError(
        (errMsg as string).includes('email or password are incorrect')
          ? 'Неверный логин или пароль'
          : 'Ошибка авторизации'
      );
    }
  }, [errMsg, isFailed]);

  return (
    <>
      <form className={`${styles.main} pt-20`} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium pb-6">Вход</h2>

        {/* Email */}
        <div className="pb-6">
          <Input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            error={isFailed}
            errorText={loginError}
            size="default"
          />
        </div>

        {/* Password */}
        <div className="pb-6">
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
          />
        </div>

        <Button type="primary" size="medium" htmlType="submit" disabled={!isValidForm}>
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
