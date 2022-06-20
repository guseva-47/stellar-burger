import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { getCurrentIngredient } from '../../services/selectors/app';
import { resetCurrent } from '../../services/redusers/app';

import styles from './constructor-page.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import OrderConstructor from '../../components/order-constructor/orderer-constructor';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

function ConstructorPage() {
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(resetCurrent());
  };

  const data = useSelector(getCurrentIngredient);

  return (
    <div className={styles.page}>
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

export default ConstructorPage;
