import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, getUser } from '../../services/redusers/auth';
import { getProfile, isProfileFailed, isProfileLoading } from '../../services/selectors/auth';

function Profile() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const dispatcher = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatcher(editUser(email, name, password));
  };

  const user = useSelector(getProfile);
  const isLoading = useSelector(isProfileLoading);
  const isFailed = useSelector(isProfileFailed);

  useEffect(() => {
    dispatcher(getUser());
  }, [dispatcher]);

  useEffect(() => {
    const func = (data) => {
      if (isLoading) return 'Загрузка...';
      if (isFailed) return 'Не удалось загрузить данные';
      return data ?? '';
    };

    const emailText = func(user?.email);
    setEmail(emailText);

    const nameText = func(user?.name);
    setName(nameText);
  }, [user, isLoading, isFailed]);

  return (
    <form onSubmit={handleSubmit}>
      {/* Имя */}
      <div className="pb-6">
        <Input
          type="text"
          autocomplete="username"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          error={false}
          size="default"
          icon="EditIcon"
          // onIconClick={() => setDisName(!disName)}
          // disabled={disName}
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
          icon="EditIcon"
        />
      </div>

      {/* Password */}
      <div className="pb-6">
        <Input
          type="password"
          autocomplete="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          error={false}
          size="default"
          icon="EditIcon"
        />
      </div>
    </form>
  );
}

export default Profile;
