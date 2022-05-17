import React from "react";
import PropTypes from "prop-types";

import IngredientsSet from "../ingredients-set/ingredients-set";
import styles from "./burger-ingredients.module.css";
import dataSet from "../utils/data";

function BurgerIngredients(props) {
  return (
    <section className={`${styles.burger_ingredients}`}>
      <IngredientsSet dataSet={dataSet} title="Булки" />
      <IngredientsSet dataSet={dataSet} title="Булки" />
    </section>
  );
}

BurgerIngredients.propTypes = {};

export default BurgerIngredients;
