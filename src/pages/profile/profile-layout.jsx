import { Link, Outlet, useMatch } from 'react-router-dom';

import styles from './profile.module.css';

function ProfileLayout() {
  const isProfile = useMatch('/profile');
  const isOrders = useMatch('/profile/orders');
  const cName = `text text_type_main-medium ${styles.link} `;
  const description = isProfile
    ? 'В этом разделе вы можете изменить свои персональные данные'
    : 'В этом разделе вы можете просмотреть свою историю заказов';

  return (
    <div className={styles.layout}>
      <section className={styles.nav}>
        <Link to="/profile" className={isProfile ? cName + styles.active : cName}>
          Профиль
        </Link>
        <Link to="orders" className={isOrders ? cName + styles.active : cName}>
          История заказов
        </Link>
        <Link to="/exit" className={cName}>
          Выход
        </Link>
        <p className="pt-15 text text_type_main-default text_color_inactive">{description}</p>
      </section>
      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default ProfileLayout;
