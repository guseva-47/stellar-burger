import { useCallback } from 'react';
import { useDrop } from 'react-dnd';

import { TIngredient, TIngredientInOrder, TypesOfIngredients } from '../../types/ingredient';
import { getBun, getStuffing } from '../../services/order/order.selector';
import { setBun, setStuffing, updateOrder } from '../../services/order/order.reducer';
import BunTop from './bun/bun-top';
import BunBottom from './bun/bun-bottom';
import Stuffing from './stuffing/stuffing';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';

import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const ingredients: TIngredientInOrder[] = useAppSelector(getStuffing);
  const bun: TIngredient | null = useAppSelector(getBun);

  const dispatch = useAppDispatch();

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
    <section ref={dropTarget} className={isHover ? styles.hover : styles.main}>
      <BunTop bun={bun ?? undefined} />

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

      <BunBottom bun={bun ?? undefined} />
    </section>
  );
}

export default BurgerConstructor;
