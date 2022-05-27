import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import NavLink from '../nav-link/nav-link';

function AppHeader() {
  const isActive = true;
  return (
    <header className={`pt-4 pb-3 ${styles.header}`}>
      <nav className={`${styles.nav} ${styles.col}`}>
        <ul className={`${styles['nav-ul']}`}>
          <li className={`${styles['nav-li']}`}>
            <div className="pr-2">
              <NavLink text="Конструктор" isActive={isActive} Icon={BurgerIcon} />
            </div>
          </li>
          <li className={`${styles['nav-li']}`}>
            <NavLink text="Лента заказов" Icon={ListIcon} />
          </li>
        </ul>
      </nav>

      <a href="##" className={`${styles.logo} pt-1`}>
        <Logo />
      </a>

      <nav className={`${styles.nav} ${styles.col} ${styles['col-right']}`}>
        <ul className={`${styles['nav-ul']}`}>
          <li className={`${styles['nav-li']}`}>
            <NavLink text="Личный кабинет" Icon={ProfileIcon} />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
