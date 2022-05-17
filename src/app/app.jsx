import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import styles from "./app.module.css";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={`${styles.col} mr-10`}>
          <BurgerConstructor />
        </section>
        <section className={styles.col}>
          <BurgerIngredients />
        </section>
      </main>
    </div>
  );
}

export default App;
