import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { getUser } from '../../services/redusers/auth';
import { getProfile, isProfileFailed, isProfileLoading } from '../../services/selectors/auth';

import styles from './profile.module.css';

function Profile() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const user = useAppSelector(getProfile);
  const isLoading = useAppSelector(isProfileLoading);
  const isFailed = useAppSelector(isProfileFailed);

  useEffect(() => {
    // todo
    // @ts-ignore
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    const check = (data: string) => {
      if (isFailed) return 'Не удалось загрузить данные';
      return data ?? '';
    };
    setEmail(check(user?.email));
    setName(check(user?.name));
  }, [user, isLoading, isFailed]);

  const navigate = useNavigate();
  const location = useLocation();

  const goToEdit = () => {
    if (isLoading || isFailed) return;
    navigate('edit', { state: { from: location } });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
      {/* Имя */}
      <div className="pb-6">
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          error={false}
          size="default"
          icon="EditIcon"
          onIconClick={goToEdit}
          disabled
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
          icon="EditIcon"
          onIconClick={goToEdit}
          disabled
        />
      </div>

      {/* Password */}
      <div className="pb-6">
        <Input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          error={false}
          size="default"
          icon="EditIcon"
          onIconClick={goToEdit}
          disabled
        />
      </div>
    </form>
  );
}

export default Profile;
