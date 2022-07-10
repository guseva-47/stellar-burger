import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient } from '../../types/ingredient';
import { getCountStuffing } from '../../services/selectors/order';

import styles from './ingredient.module.css';

type Props = {
  ingredient: TIngredient;
};

function Ingredient({ ingredient }: Props) {
  const location = useLocation();

  const [{ isDrag }, dragRef] = useDrag({
    type: ingredient.type,
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const count = useSelector((state) => (
    // todo
    // @ts-ignore
    getCountStuffing(state, ingredient)
  ));

  return (
    <article className={`${styles.ingredient} ${isDrag ? styles.drag : ''}`} ref={dragRef}>
      <Link
        to={`/ingredients/${ingredient._id}`}
        state={{ backgroundLocation: location }}
        className={styles.wrapper}
      >
        {count > 0 ? <Counter count={count} size="default" /> : null}
        <div className=" pr-3 pb-1 pl-4">
          <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
        </div>

        <h3 className={`${styles.price} text text_type_digits-default pb-2`}>
          <span className="pr-2">{ingredient.price}</span>
          <CurrencyIcon type="primary" />
        </h3>

        <h3 className={`${styles.name} text text_type_main-default`}>{ingredient.name}</h3>
      </Link>
    </article>
  );
}

export default Ingredient;
