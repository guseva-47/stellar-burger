import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import { getBun, getStuffing } from '../../services/selectors/order';
import { removeStuffing, setBun, setStuffing } from '../../services/redusers/order';
import BunTop from './bun/bun-top';
import BunBottom from './bun/bun-bottom';

function BurgerConstructor() {
  const ingredients = useSelector(getStuffing);
  const bun = useSelector(getBun);

  const dispatch = useDispatch();

  const onDropHandler = ({ ingredient }) => {
    const action = ingredient.type === 'bun' ? setBun : setStuffing;
    dispatch(action(ingredient));
  };

  const [, dropTarget] = useDrop({
    accept: ['sauce', 'main', 'bun'],
    drop(ingredient) {
      onDropHandler(ingredient);
    },
  });

  const deleteStuffing = (ingredient) => {
    dispatch(removeStuffing(ingredient));
  };

  return (
    <section ref={dropTarget} className={styles.tes}>
      <div className={`${styles.line} pl-8 pr-4 pb-4`}>
        <BunTop bun={bun} />
      </div>
      <div className={`${styles.middle} ${styles.elements} custom-scroll`}>
        {ingredients.map((data) => (
          <div className={`${styles.line}`} key={uuidv4()}>
            <span className="pr-2">
              <DragIcon type="primary" />
            </span>
            <ConstructorElement
              text={data.name}
              price={data.price}
              thumbnail={data.image}
              className={`${styles.element}`}
              handleClose={() => deleteStuffing(data)}
            />
          </div>
        ))}
      </div>

      <div className={`${styles.line} pl-8 pr-4 pt-4`}>
        <BunBottom bun={bun} />
      </div>
    </section>
  );
}

export default BurgerConstructor;
