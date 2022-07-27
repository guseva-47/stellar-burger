import { TIngredient } from '../../types/ingredient';
import styles from './ingredient-icon.module.css';

type Props = {
  ingredient: TIngredient;
  count?: number;
};

function IngredientIcon({ ingredient, count }: Props) {
  return (
    <article className={styles.ingredient}>
      {count && <span className={`${styles.count} text text_type_main-medium`}>{`+${count}`}</span>}
      <img className={styles.img} src={ingredient.image_mobile} alt={ingredient.name} />
    </article>
  );
}

IngredientIcon.defaultProps = {
  count: null,
};

export default IngredientIcon;
