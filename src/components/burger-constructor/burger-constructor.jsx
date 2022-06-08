import { useSelector } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import { getBun, getStuffing } from '../../services/selectors/order';

function BurgerConstructor() {
  const ingredients = useSelector(getStuffing);
  const bun = useSelector(getBun);

  return (
    <div>
      <div className={`${styles.line} pl-8`}>
        <ConstructorElement
          type="top"
          isLocked
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          className={`${styles.element}`}
        />
      </div>
      <div className={`${styles.middle} ${styles.elements} custom-scroll`}>
        {ingredients.map((data, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className={`${styles.line}`} key={i}>
            <span className="pr-2">
              <DragIcon type="primary" />
            </span>
            <ConstructorElement
              text={data.name}
              price={data.price}
              thumbnail={data.image}
              className={`${styles.element}`}
            />
          </div>
        ))}
      </div>

      <div className={`${styles.line} pl-8`}>
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
          className={`${styles.element}`}
        />
      </div>
    </div>
  );
}

export default BurgerConstructor;
