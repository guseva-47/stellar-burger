import {
  getIngredientsByType,
  isAllIngredientsFailed,
  isAllIngredientsLoading,
} from '../../services/app/app.selector';

import Ingredient from '../ingredient/ingredient';
import { TIngredient } from '../../types/ingredient';
import { useAppSelector } from '../../hooks/use-store';

import styles from './ingredients-set.module.css';

type Props = {
  type: {
    title: string;
    value: string;
  };
};

function IngredientsSet({ type = { title: '', value: '' } }: Props) {
  const ingredients: TIngredient[] = useAppSelector((state) => (
    getIngredientsByType(state, type.value)
  ));

  const isLoding: boolean = useAppSelector(isAllIngredientsLoading);
  const isFailed: boolean = useAppSelector(isAllIngredientsFailed);

  return (
    <section>
      <h2 className="text text_type_main-medium">{type.title}</h2>

      <section className="pt-6 pb-2">
        {isLoding && <p className="text text_type_main-default pb-6">Загрузка...</p>}
        {isFailed && <p className="text text_type_main-default pb-6">Ошибка загрузки</p>}
        {!isLoding && !isFailed && ingredients.length === 0 ? (
          <p className="text text_type_main-default pb-6">Пусто</p>
        ) : (
          <ul className={`${styles.ingredients}`}>
            {ingredients.map((data) => (
              <li className={`${styles.item}`} key={data._id}>
                <Ingredient ingredient={data} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

export default IngredientsSet;
