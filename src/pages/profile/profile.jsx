import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

function Profile() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section>
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
    </section>
  );
}

export default Profile;
