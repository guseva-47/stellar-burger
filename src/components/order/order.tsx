import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';
import TLocation from '../../types/location';
import data from '../../utils/order-data';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import styles from './order.module.css';

function Order() {
  const ingredients = data;

  const location = useLocation();
  const cName = !(location as TLocation).state?.backgroundLocation ? 'pt-30' : '';
  return (
    <section className={`${styles.order} ${cName}`}>
      <div className={styles.wrapper}>
        <p className={`${styles.header} text text_type_digits-default pb-10`}>#3848382</p>

        <h2 className="text text_type_main-medium pb-3">Black Hole Singularity острый бургер</h2>
        <p className={`${styles['status-done']} text text_type_main-small`}>Выполнен</p>
        <h3 className="text text_type_main-medium pt-15 pb-6">Состав:</h3>
        <ul className={`${styles.ingredients} custom-scroll pb-10`}>
          {ingredients.map((ingredient) => (
            <li>
              <article className={styles.ingredient}>
                <IngredientIcon ingredient={ingredient} />
                <p className={`${styles.title} text text_type_main-small pl-4 pr-4`}>
                  {ingredient.name}
                </p>
                <div className={styles.price}>
                  <p className="text text_type_digits-default pr-2">{`${2} x ${ingredient.price}`}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </article>
            </li>
          ))}
        </ul>
        <div className={`${styles.line} pt-15`}>
          <time className="text text_type_main-default text_color_inactive">
            Сегодня, 16:20 i-GMT+3
          </time>
          <div className={styles.price}>
            <p className="text text_type_digits-default pr-2">510</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Order;
