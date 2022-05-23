import { useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientsSet from "../ingredients-set/ingredients-set";
import styles from "./burger-ingredients.module.css";
import ingredientPropTypes from "../prop-types/ingredient-prop-types";

function BurgerIngredients({ ingredients = [] }) {
  const types = [
    {
      value: "bun",
      title: "Булки",
    },
    {
      value: "sauce",
      title: "Соусы",
    },
    {
      value: "main",
      title: "Начинки",
    },
  ];

  const [current, setCurrent] = useState(types[0].value);

  return (
    <section className={`pt-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>

      <div className={`${styles.tabs} pb-10`}>
        {types.map(({ value, title }) => {
          return (
            <Tab
              value={value}
              active={current === value}
              onClick={setCurrent}
              key={value}
            >
              {title}
            </Tab>
          );
        })}
      </div>
      <section className={`${styles.elements} custom-scroll`}>
        {types.map(({ value, title }) => {
          const ingredientsSet = ingredients.filter(
            (data) => data.type === value
          );
          return (
            <IngredientsSet
              dataSet={ingredientsSet}
              title={title}
              key={value}
            />
          );
        })}
      </section>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
