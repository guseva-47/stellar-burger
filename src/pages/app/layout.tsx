import { Outlet } from 'react-router-dom';
import AppHeader from '../../components/app-header/app-header';

import styles from './layout.module.css';

function Layout() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
