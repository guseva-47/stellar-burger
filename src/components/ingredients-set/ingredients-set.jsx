import { useSelector } from 'react-redux';

import Ingredient from '../ingredient/ingredient';
import ingredientsTypePropTypes from '../prop-types/ingredients-type-prop-types';
import styles from './ingredients-set.module.css';

function IngredientsSet({ type }) {
  const ingredients = useSelector((store) => (
    store.app.allIngredients.filter((item) => item.type === type.value)
  ));

  return (
    <section>
      <h2 className="text text_type_main-medium">{type.title}</h2>

      <section className="pt-6 pb-2">
        {ingredients.length === 0 ? (
          <p className="text text_type_main-default pb-6">Пусто</p>
        ) : (
          <ul className={`${styles.ingredients}`}>
            {ingredients.map((data) => (
              <li className={`${styles.item}`} key={data._id}>
                <Ingredient data={data} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

IngredientsSet.propTypes = {
  type: ingredientsTypePropTypes.isRequired,
};

export default IngredientsSet;
