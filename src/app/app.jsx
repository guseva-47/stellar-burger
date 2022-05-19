import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import styles from "./app.module.css";
import ingredients from "../utils/data";

function App() {
  const bun = {
    _id: "60666c42cc7b410027a1a9b1",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <section className={`${styles.col} mr-10`}>
          <BurgerIngredients ingredients={ingredients} />
        </section>
        <section className={styles.col}>
          <BurgerConstructor ingredients={ingredients} bun={bun} />
        </section>
      </main>
    </div>
  );
}

export default App;
