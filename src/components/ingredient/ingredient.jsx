import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient.module.css';
import ingredientPropTypes from '../prop-types/ingredient-prop-types';
import { setCurrent } from '../../services/redusers/app';
import { getCountStuffing } from '../../services/selectors/order';

function Ingredient({ data }) {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(setCurrent(data));
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: data.type,
    item: { ingredient: data },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const count = useSelector((state) => getCountStuffing(state, { id: data._id, type: data.type }));

  return (
    <article className={`${styles.ingredient} ${isDrag ? styles.drag : ''}`} ref={dragRef}>
      <button type="button" className={styles.wrapper} onClick={clickHandler}>
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
    </article>
  );
}

Ingredient.propTypes = {
  data: ingredientPropTypes.isRequired,
};

export default Ingredient;
