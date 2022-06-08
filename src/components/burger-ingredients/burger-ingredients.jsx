import { useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientsSet from '../ingredients-set/ingredients-set';
import styles from './burger-ingredients.module.css';
import types from './ingredient-types';

function BurgerIngredients() {
  const [currentType, setCurrentType] = useState(types[0].value);

  const itemsRef = useRef([]);

  const clickHAndler = (value, i) => {
    setCurrentType(value);
    itemsRef.current[i].scrollIntoView();
  };

  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>

      {/* Табы с типами ингредиентов */}
      <div className={`${styles.tabs} pb-10`}>
        {types.map(({ value, title }, i) => (
          <Tab
            value={value}
            active={currentType === value}
            onClick={() => clickHAndler(value, i)}
            key={value}
          >
            {title}
          </Tab>
        ))}
      </div>

      {/* Блоки ингредиентов */}
      <section className={`${styles.elements} custom-scroll`}>
        {types.map((type, i) => (
          <div
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            key={type.value}
          >
            <IngredientsSet type={type} key={type.value} />
          </div>
        ))}
      </section>
    </section>
  );
}

export default BurgerIngredients;
