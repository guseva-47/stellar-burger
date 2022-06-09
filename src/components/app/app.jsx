import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../app-header/app-header';
import OrderConstructor from '../order-constructor/orderer-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { getCurrentIngredient } from '../../services/selectors/app';
import { resetCurrent } from '../../services/redusers/app';

function App() {
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(resetCurrent());
  };

  const data = useSelector(getCurrentIngredient);

  return (
    <div className={styles.app}>
      <AppHeader />

      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <section className={`${styles.col} mr-10`}>
            <BurgerIngredients />
          </section>
          <section className={styles.col}>
            <OrderConstructor />
          </section>
        </DndProvider>

        {/* Модальное окно */}
        {!!data && (
          <Modal title="Детали ингредиента" ingredient={data} closeHandler={closeHandler}>
            <IngredientDetails data={data ?? {}} />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
