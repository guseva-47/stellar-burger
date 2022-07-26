import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/order-data';

import styles from './feed-order-record.module.css';

function FeedOrderRecord() {
  const ingredients = data;
  return (
    <article className={styles.record}>
      <div className={styles.line}>
        <p className="text text_type_main-default">#034535</p>
        <time className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </time>
      </div>
      <h2 className="text text_type_main-medium">Death Star Starship Main бургер</h2>
      <div className={styles.line}>
        <div className={styles.ingredients}>
          <div className={styles.ingredient}>
            <span className={`${styles['ingredient-count']} text text_type_main-medium`}>+3</span>
            <img
              className={styles['ingredient-img']}
              src={ingredients[0].image_mobile}
              alt={ingredients[0].name}
            />
          </div>
          {ingredients.reverse().map((ingredient) => (
            <div className={styles.ingredient}>
              <img
                className={styles['ingredient-img']}
                src={ingredient.image_mobile}
                alt={ingredient.name}
              />
            </div>
          ))}
        </div>
        <div className={`${styles.icon}`}>
          <span className="text text_type_digits-default mr-2">560</span>
          <span>
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default FeedOrderRecord;
