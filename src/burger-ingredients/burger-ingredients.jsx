import React from "react";
import PropTypes from "prop-types";

import IngredientsSet from "../ingredients-set/ingredients-set";
import styles from "./burger-ingredients.module.css";
import dataSet from "../utils/data";

function BurgerIngredients(props) {
  const types = [
    {
      type: "bun",
      title: "Булки",
    },
    {
      type: "sauce",
      title: "Соусы",
    },
    {
      type: "main",
      title: "Начинки",
    },
  ];

  return (
    <section className={`${styles.burger_ingredients}`}>
      {types.map(({ type, title }) => {
        const ingredientsSet = dataSet.filter((data) => data.type === type);
        return (
          <IngredientsSet dataSet={ingredientsSet} title={title} key={type} />
        );
      })}
    </section>
  );
}

BurgerIngredients.propTypes = {};

export default BurgerIngredients;
