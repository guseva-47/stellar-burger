import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient.module.css';
import ingredientPropTypes from '../prop-types/ingredient-prop-types';

function Ingredient({ data, count = 0 }) {
  return (
    <article className={`${styles.ingredient}`}>
      {count > 0 ? <Counter count={count} size="default" /> : null}
      <div className=" pr-3 pb-1 pl-4">
        <img src={data.image} alt={data.name} />
      </div>

      <h3 className={`${styles.price} text text_type_digits-default pb-2`}>
        <span className="pr-2">{data.price}</span>
        <CurrencyIcon type="primary" />
      </h3>

      <h3 className={`${styles.name} text text_type_main-default`}>{data.name}</h3>
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
