import styles from './ingredient-details.module.css';
import ingredientPropTypes from '../prop-types/ingredient-prop-types';

function IngredientDetails({ data = {} }) {
  const energyValue = [
    ['Каллории, ккал', data.calories],
    ['Белки, г', data.proteins],
    ['Жиры, г', data.fat],
    ['Улеводы, г', data.carbohydrates],
  ];

  return (
    <article className={`${styles.ingredient}`}>
      <div className=" pr-3 pb-4 pl-4">
        <img src={data.image_large} alt={data.name} />
      </div>

      <h3 className={`${styles.name} text text_type_main-medium pb-2`}>{data.name}</h3>
      <ul className={`${styles.list}`}>
        {energyValue.map(([title, val]) => (
          <li key={val} className={`${styles.elem}`}>
            <span className="text text_type_main-default pb-2">{title}</span>
            <span className="text text_type_digits-default pb-1">{val}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

IngredientDetails.propTypes = {
  data: ingredientPropTypes.isRequired,
};

export default IngredientDetails;
