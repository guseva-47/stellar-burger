import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientPropTypes from '../prop-types/ingredient-prop-types';
import styles from './burger-constructor.module.css';

function BurgerConstructor({ bun = {}, ingredients = [] }) {
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

BurgerConstructor.propTypes = {
  bun: ingredientPropTypes.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;
