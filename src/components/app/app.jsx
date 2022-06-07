import { useSelector } from 'react-redux';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';

function App() {
  const ingredients = useSelector((store) => store.app.allIngredients);

  const stuffing = ingredients.filter((elem) => elem.type !== 'bun');
  const bun = ingredients.find((elem) => elem.type === 'bun') || {};

  return (
    <div className={styles.app}>
      <AppHeader />

      <main className={styles.main}>
        <section className={`${styles.col} mr-10`}>
          <BurgerIngredients ingredients={ingredients} />
        </section>
        <section className={styles.col}>
          <BurgerConstructor ingredients={stuffing} bun={bun} />
        </section>
      </main>
    </div>
  );
}

export default App;
