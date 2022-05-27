import { useState } from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient.module.css';
import ingredientPropTypes from '../prop-types/ingredient-prop-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function Ingredient({ data, count = 0 }) {
  const [isVisible, setIsVisible] = useState(false);

  const closeHandler = () => setIsVisible(false);

  return (
    <article className={`${styles.ingredient}`}>
      <button type="button" className={styles.wrapper} onClick={() => setIsVisible(true)}>
        {count > 0 ? <Counter count={count} size="default" /> : null}
        <div className=" pr-3 pb-1 pl-4">
          <img src={data.image} alt={data.name} />
        </div>

        <h3 className={`${styles.price} text text_type_digits-default pb-2`}>
          <span className="pr-2">{data.price}</span>
          <CurrencyIcon type="primary" />
        </h3>

        <h3 className={`${styles.name} text text_type_main-default`}>{data.name}</h3>
      </button>

      {isVisible && (
        <Modal title="Детали ингредиента" ingredient={data} closeHandler={closeHandler}>
          <IngredientDetails data={data} />
        </Modal>
      )}
    </article>
  );
}

Ingredient.propTypes = {
  data: ingredientPropTypes.isRequired,
  count: PropTypes.number,
};

Ingredient.defaultProps = {
  count: 0,
};

export default Ingredient;
