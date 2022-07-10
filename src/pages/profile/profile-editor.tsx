import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { editUser } from '../../services/redusers/auth';
import { getProfile, isEditLoading } from '../../services/selectors/auth';
import TLocation from '../../types/location';

import styles from './profile.module.css';

function ProfileEditor() {
  const user = useSelector(getProfile);
  const isLoading = useSelector(isEditLoading);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const profilePath = '/profile';
    if ((location as TLocation).state?.from?.pathname !== profilePath) {
      navigate(profilePath, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    setEmail(user?.email ?? '');
    setName(user?.name ?? '');
  }, [user]);

  const cancelName = () => setName(user?.name ?? '');
  const cancelEmail = () => setEmail(user?.email ?? '');
  const cancelPassword = () => setPassword('');

  const cancelHandler = () => {
    navigate(-1);
  };

  const isValidForm = name && email && (password.length >= 6 || password === '');
  const [isSaved, setIsSaved] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isValidForm) {
      const newData = { name: user.name, email: user.email, password };
      if (user.name !== name) newData.name = name;
      if (user.email !== email) newData.email = email;
      if (password.length >= 6) newData.password = password;

      if (Object.keys(newData).length > 0) {
        // todo
        // @ts-ignore
        dispatch(editUser(newData));
      }
    }

    setIsSaved(true);
  };

  useEffect(() => {
    if (isSaved && !isLoading) navigate(-1);
  }, [isLoading, isSaved, navigate]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
          icon="CloseIcon"
          onIconClick={cancelName}
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
          icon="CloseIcon"
          onIconClick={cancelEmail}
        />
      </div>

      {/* Password */}
      <div className="pb-6">
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          error={false}
          size="default"
          icon="CloseIcon"
          onIconClick={cancelPassword}
        />
      </div>

      <div>
        <Button type="secondary" htmlType="reset" onClick={cancelHandler}>
          Отмена
        </Button>
        <Button htmlType="submit" disabled={!isValidForm}>
          Сохранить
        </Button>
      </div>
    </form>
  );
}

export default ProfileEditor;
