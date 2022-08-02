import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientInOrder, TypesOfIngredients } from '../../types/ingredient';
import IngredientIcon from '../ingredient-icon/ingredient-icon';

import styles from './order.module.css';

type Props = {
  ingredient: TIngredientInOrder;
};

function IngredientLine({ ingredient }: Props) {
  return (
    <li key={ingredient.uuid}>
      <article className={styles.ingredient}>
        <IngredientIcon ingredient={ingredient} />
        <p className={`${styles.title} text text_type_main-small pl-4 pr-4`}>{ingredient.name}</p>
        <div className={styles.price}>
          <p className="text text_type_digits-default pr-2">
            {ingredient.type === TypesOfIngredients.bun
              ? `${2} x ${ingredient.price}`
              : `${ingredient.price}`}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </article>
    </li>
  );
}

export default IngredientLine;
