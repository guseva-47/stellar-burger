import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import OrderConstructor from '../../components/order-constructor/orderer-constructor';

import styles from './constructor-page.module.css';

function ConstructorPage() {
  return (
    <section className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        <section className={`${styles.col} mr-10`}>
          <BurgerIngredients />
        </section>
        <section className={styles.col}>
          <OrderConstructor />
        </section>
      </DndProvider>
    </section>
  );
}

export default ConstructorPage;
