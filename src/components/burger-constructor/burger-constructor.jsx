import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import { getBun, getStuffing } from '../../services/selectors/order';
import { setBun, setStuffing, updateOrder } from '../../services/redusers/order';
import BunTop from './bun/bun-top';
import BunBottom from './bun/bun-bottom';
import Stuffing from './stuffing/stuffing';
import { BUN, MAIN, SAUCE } from '../../types/ingredient-types';

import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const ingredients = useSelector(getStuffing);
  const bun = useSelector(getBun);

  const dispatch = useDispatch();

  const onDropHandler = ({ ingredient }) => {
    const action = ingredient.type === BUN ? setBun : setStuffing;
    dispatch(action(ingredient));
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: [BUN, MAIN, SAUCE],
    drop(ingredient) {
      onDropHandler(ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    dispatch(updateOrder({ idFrom: dragIndex, idTo: hoverIndex }));
  }, [dispatch]);

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
