import React from "react";
import PropTypes from "prop-types";

import Ingredient from "../ingredient/ingredient";

import styles from "./ingredients-set.module.css";

function IngredientsSet({ title = "", dataSet = [] }) {
  return (
    <section>
      <h2 className={`text text_type_main-medium`}>{title}</h2>

      <section className="pt-6 pb-2">
        <ul className={`${styles.ingredients}`}>
          {dataSet.map((data) => (
            <li className={`${styles.item}`} key={data._id}>
              <Ingredient data={data} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

IngredientsSet.propTypes = {};

export default IngredientsSet;
