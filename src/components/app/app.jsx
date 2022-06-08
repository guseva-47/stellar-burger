import { useSelector } from 'react-redux';

import AppHeader from '../app-header/app-header';
import OrderConstructor from '../order-constructor/orderer-constructor';
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
          <BurgerIngredients />
        </section>
        <section className={styles.col}>
          <OrderConstructor ingredients={stuffing} bun={bun} />
        </section>
      </main>
    </div>
  );
}

export default App;
