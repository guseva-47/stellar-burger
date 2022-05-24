import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import bun from '../../utils/bun';
import styles from './app.module.css';
import ingredientsData from '../../utils/data';
import BackendApi from '../../api/backend-api';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    BackendApi.getAllIngredients()
      .then((res) => setIngredients(res))
      .catch((err) => console.error(err.message));
  }, []);

  const stuffing = ingredientsData.filter((elem) => elem.type !== 'bun');

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
