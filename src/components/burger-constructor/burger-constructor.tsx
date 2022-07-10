import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import { TIngredient, TIngredientInOrder, TypesOfIngredients } from '../../types/ingredient';
import { getBun, getStuffing } from '../../services/selectors/order';
import { setBun, setStuffing, updateOrder } from '../../services/redusers/order';
import BunTop from './bun/bun-top';
import BunBottom from './bun/bun-bottom';
import Stuffing from './stuffing/stuffing';

import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const ingredients: TIngredientInOrder[] = useSelector(getStuffing);
  const bun: TIngredient = useSelector(getBun);

  const dispatch = useDispatch();

  const onDropHandler = (ingredient: TIngredient) => {
    const action = ingredient.type === TypesOfIngredients.bun ? setBun : setStuffing;
    dispatch(action(ingredient));
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: Object.values(TypesOfIngredients),
    drop(item: { ingredient: TIngredient }) {
      onDropHandler(item.ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(updateOrder({ idFrom: dragIndex, idTo: hoverIndex }));
    },
    [dispatch]
  );

  return (
    <section ref={dropTarget} className={styles.tes}>
      <BunTop bun={bun} />

      <ul className={`${styles.middle} ${styles.elements} custom-scroll`}>
        {ingredients.length === 0 && (
          <li>
            <Stuffing />
          </li>
        )}

        {ingredients.map((data, i) => (
          <li key={data.uuid}>
            <Stuffing ingredient={data} index={i} moveCard={moveCard} />
          </li>
        ))}
      </ul>

      <BunBottom bun={bun} />
    </section>
  );
}

export default BurgerConstructor;
