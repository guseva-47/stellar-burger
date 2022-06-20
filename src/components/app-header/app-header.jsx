import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import NavLink from '../nav-link/nav-link';

import styles from './app-header.module.css';

function AppHeader() {
  const isActive = true;
  return (
    <header className={`pt-4 pb-3 ${styles.header}`}>
      <nav className={`${styles.nav} ${styles.col}`}>
        <ul className={`${styles['nav-ul']}`}>
          <li className={`${styles['nav-li']}`}>
            <div className="pr-2">
              <NavLink to="/" text="Конструктор" isActive={isActive} Icon={BurgerIcon} />
            </div>
          </li>
          <li className={`${styles['nav-li']}`}>
            <NavLink to="/orders" text="Лента заказов" Icon={ListIcon} />
          </li>
        </ul>
      </nav>

      <Link to="/" className={`${styles.logo} pt-1`}>
        <Logo />
      </Link>

      <nav className={`${styles.nav} ${styles.col} ${styles['col-right']}`}>
        <ul className={`${styles['nav-ul']}`}>
          <li className={`${styles['nav-li']}`}>
            <NavLink to="/profile" text="Личный кабинет" Icon={ProfileIcon} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
