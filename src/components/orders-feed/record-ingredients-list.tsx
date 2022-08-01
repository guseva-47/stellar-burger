import { TIngredientInOrder } from '../../types/ingredient';
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import styles from './feed-order-record.module.css';

type Props = {
  ingredients: TIngredientInOrder[];
};

function RecordIngredientsList({ ingredients }: Props) {
  const maxCount = 5;
  const visibleIngredients = () => ingredients.slice(0, maxCount).reverse();
  const countOfInvisible = () => ingredients.length - maxCount;

  return (
    <div className={styles.ingredients}>
      { (countOfInvisible() > 0) && (
        <div className={styles.ingredient}>
          <IngredientIcon ingredient={ingredients[maxCount]} count={countOfInvisible()} />
        </div>
      )}
      {visibleIngredients().map((ingredient) => (
        <div className={styles.ingredient} key={ingredient.uuid}>
          <IngredientIcon ingredient={ingredient} />
        </div>
      ))}
    </div>
  );
}

export default RecordIngredientsList;
