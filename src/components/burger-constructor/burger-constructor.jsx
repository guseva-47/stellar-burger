import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import styles from './burger-constructor.module.css';
import { getBun, getStuffing } from '../../services/selectors/order';
import { setBun, setStuffing } from '../../services/redusers/order';
import BunTop from './bun/bun-top';
import BunBottom from './bun/bun-bottom';
import Stuffing from './stuffing/stuffing';
import { BUN, MAIN, SAUCE } from '../../types/ingredient-types';

function BurgerConstructor() {
  const ingredients = useSelector(getStuffing);
  const bun = useSelector(getBun);

  const dispatch = useDispatch();

  const onDropHandler = ({ ingredient }) => {
    const action = ingredient.type === BUN ? setBun : setStuffing;
    dispatch(action(ingredient));
  };

  const [, dropTarget] = useDrop({
    accept: [BUN, MAIN, SAUCE],
    drop(ingredient) {
      onDropHandler(ingredient);
    },
  });

  return (
    <section ref={dropTarget} className={styles.tes}>
      <BunTop bun={bun} />

      <ul className={`${styles.middle} ${styles.elements} custom-scroll`}>
        {ingredients.length === 0 && (
          <li>
            <Stuffing />
          </li>
        )}

        {ingredients.map((data) => (
          <li key={uuidv4()}>
            <Stuffing ingredient={data} />
          </li>
        ))}
      </ul>

      <BunBottom bun={bun} />
    </section>
  );
}

export default BurgerConstructor;
