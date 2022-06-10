import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientsSet from '../ingredients-set/ingredients-set';
import styles from './burger-ingredients.module.css';
import types from './ingredient-types';
import { fetchGetItems } from '../../services/redusers/app';

function BurgerIngredients() {
  const [currentType, setCurrentType] = useState(0);

  const itemsRef = useRef([]);
  const scrollAreaRef = useRef();

  const current = () => {
    const { top } = scrollAreaRef.current.getBoundingClientRect();
    const res = itemsRef.current.map((r) => Math.abs(r.getBoundingClientRect().top - top));
    let iOfMin = 0;
    res.forEach((px, i) => {
      iOfMin = px < res[iOfMin] ? i : iOfMin;
    });
    setCurrentType(iOfMin);
  };

  const tabClickHandler = (i) => {
    setCurrentType(i);
    itemsRef.current[i].scrollIntoView();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetItems());
  }, [dispatch]);

  useEffect(() => {
    const node = scrollAreaRef.current;
    node.addEventListener('scroll', current);

    return () => {
      node.removeEventListener('scroll', current);
    };
  }, []);

  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>

      {/* Табы с типами ингредиентов */}
      <div className={`${styles.tabs} pb-10`}>
        {types.map(({ value, title }, i) => (
          <Tab
            value={value}
            active={currentType === i}
            onClick={() => tabClickHandler(i)}
            key={value}
          >
            {title}
          </Tab>
        ))}
      </div>

      {/* Блоки ингредиентов */}
      <section className={`${styles.elements} custom-scroll`} ref={scrollAreaRef}>
        {types.map((type, i) => (
          <div
            key={type.value}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
          >
            <IngredientsSet type={type} key={type.value} />
          </div>
        ))}
      </section>
    </section>
  );
}

export default BurgerIngredients;
