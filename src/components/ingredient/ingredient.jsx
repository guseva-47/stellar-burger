import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientPropTypes from '../../types/ingredient-prop-types';
import { getCountStuffing } from '../../services/selectors/order';

import styles from './ingredient.module.css';

function Ingredient({ data }) {
  const location = useLocation();

  const [{ isDrag }, dragRef] = useDrag({
    type: data.type,
    item: { ingredient: data },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const count = useSelector((state) => getCountStuffing(state, data));

  return (
    <article className={`${styles.ingredient} ${isDrag ? styles.drag : ''}`} ref={dragRef}>
      <Link
        to={`/ingredients/${data._id}`}
        state={{ backgroundLocation: location }}
        className={styles.wrapper}
      >
        {count > 0 ? <Counter count={count} size="default" /> : null}
        <div className=" pr-3 pb-1 pl-4">
          <img className={styles.image} src={data.image} alt={data.name} />
        </div>

        <h3 className={`${styles.price} text text_type_digits-default pb-2`}>
          <span className="pr-2">{data.price}</span>
          <CurrencyIcon type="primary" />
        </h3>

        <h3 className={`${styles.name} text text_type_main-default`}>{data.name}</h3>
      </Link>
    </article>
  );
}

Ingredient.propTypes = {
  data: ingredientPropTypes.isRequired,
};

export default Ingredient;
