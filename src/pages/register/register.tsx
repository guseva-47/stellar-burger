import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { registratiion } from '../../services/auth/auth.reducer';
import { isRegFailed, regErrorMessage } from '../../services/auth/auth.selector';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';

import styles from './register.module.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regError, setRegError] = useState('');

  const isValidForm = name && email && password.length >= 6;

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setRegError('');
    // todo
    // @ts-ignore
    dispatch(registratiion({ email, password, name }));
  };

  const isFailed = useAppSelector(isRegFailed);
  const errMsg = useAppSelector(regErrorMessage);

  useEffect(() => {
    if (isFailed) {
      setRegError(
        errMsg.includes('User already exists')
          ? 'Пользователь уже существует'
          : 'Ошибка регистрации'
      );
    }
  }, [errMsg, isFailed]);

  return (
    <>
      <form className={`${styles.main} pt-20`} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium pb-6">
          Регистрация
        </h2>

        {/* Имя */}
        <div className="pb-6">
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="email"
            size="default"
            errorText={regError}
            error={isFailed}
          />
        </div>

        {/* Email */}
        <div className="pb-6">
          <Input
            type="email"
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
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
          />
        </div>

        <Button type="primary" size="medium" htmlType="submit" disabled={!isValidForm}>
          Зарегистрироваться
        </Button>
      </form>

      <div className={`${styles.main} pt-20`}>
        <p className="text text_type_main-default">
          Уже зарегистрированы?
          <Link to="/login" className={styles.link}>
            {' '}
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}

export default RegisterPage;
