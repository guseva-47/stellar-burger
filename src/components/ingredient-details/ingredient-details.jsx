import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { getIngredientById } from '../../services/selectors/app';

import styles from './ingredient-details.module.css';

function IngredientDetails() {
  const { id } = useParams();
  const ingredient = useSelector((state) => getIngredientById(state, id));
  const location = useLocation();
  const cName = !location.state?.backgroundLocation ? styles.wrapper : '';

  const energyValue = !ingredient ? [] : [
    ['Каллории, ккал', ingredient.calories],
    ['Белки, г', ingredient.proteins],
    ['Жиры, г', ingredient.fat],
    ['Улеводы, г', ingredient.carbohydrates],
  ];

  return (
    <div className={cName}>
      <article className={`${styles.ingredient}`}>
        {ingredient ? (
          <>
            <div className=" pr-3 pb-4 pl-4">
              <img src={ingredient.image_large} alt={ingredient.name} />
            </div>

            <h3 className={`${styles.name} text text_type_main-medium pb-2`}>{ingredient.name}</h3>
            <ul className={`${styles.list}`}>
              {energyValue.map(([title, val]) => (
                <li key={title} className={`${styles.elem}`}>
                  <span className="text text_type_main-default pb-2">{title}</span>
                  <span className="text text_type_digits-default pb-1">{val}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h2 className="text text_type_main-large">Загрузка</h2>
        )}
      </article>
    </div>
  );
}

export default IngredientDetails;
