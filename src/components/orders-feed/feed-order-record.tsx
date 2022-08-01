import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientInOrder } from '../../types/ingredient';
import { TOrederStatus } from '../../types/order';
import IngredientIcon from '../ingredient-icon/ingredient-icon';

import styles from './feed-order-record.module.css';

type Props = {
  ingredients: TIngredientInOrder[];
  status?: TOrederStatus;
  name: string;
  number: number;
  createdAt: string;
};

// todo
// дата день
// обрабатывать сколько иконочек ингредиентов (нужен ли плюс сколько-то)
//   , мб вынести в отдельный компонент

function FeedOrderRecord({ createdAt, ingredients, name, number, status }: Props) {
  // const ingredients = data;
  const cost = ingredients.reduce((prev, elem) => prev + elem.price, 0);

  return (
    <article className={styles.record}>
      <div className={styles.line}>
        <p className="text text_type_main-default">{`#${number}`}</p>
        <time className="text text_type_main-default text_color_inactive">
          {createdAt}
        </time>
      </div>
      <h2 className="text text_type_main-medium">{name}</h2>

      {status && <p className="text text_type_main-default">{status}</p>}

      <div className={styles.line}>
        <div className={styles.ingredients}>
          <div className={styles.ingredient}>
            <IngredientIcon ingredient={ingredients[0]} count={5} />
          </div>
          {ingredients.reverse().map((ingredient) => (
            <div className={styles.ingredient} key={ingredient.uuid}>
              <IngredientIcon ingredient={ingredient} />
            </div>
          ))}
        </div>
        <div className={`${styles.icon}`}>
          <span className="text text_type_digits-default mr-2">{cost}</span>
          <span>
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </div>
    </article>
  );
}

FeedOrderRecord.defaultProps = {
  status: null,
};

export default FeedOrderRecord;
