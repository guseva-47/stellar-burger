import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { getCurrentIngredient } from '../../services/selectors/app';
import { resetCurrent } from '../../services/redusers/app';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import OrderConstructor from '../../components/order-constructor/orderer-constructor';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

import styles from './constructor-page.module.css';

function ConstructorPage() {
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(resetCurrent());
  };

  const data = useSelector(getCurrentIngredient);

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

      {/* Модальное окно */}
      {!!data && (
        <Modal title="Детали ингредиента" ingredient={data} closeHandler={closeHandler}>
          <IngredientDetails data={data ?? {}} />
        </Modal>
      )}
    </section>
  );
}

export default ConstructorPage;
