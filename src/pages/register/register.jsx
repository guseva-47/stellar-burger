import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { registratiion } from '../../services/redusers/auth';

import styles from './register.module.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registratiion({ email, password, name }));
  };

  return (
    <>
      <form className={`${styles.main} pt-20`} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium pb-6">Регистрация</h2>

        {/* Имя */}
        <div className="pb-6">
          <Input
            type="text"
            autocomplete="name"
            placeholder="Имя"
            onChange={(e) => setName(e.target.value)}
            value={name}
            name="email"
            error={false}
            size="default"
          />
        </div>

        {/* Email */}
        <div className="pb-6">
          <Input
            type="email"
            autocomplete="username"
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

        <Button type="primary" size="medium" htmlType="submit">
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
