import React from "react";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ingredient.module.css";

// {
//   _id: "60666c42cc7b410027a1a9b5",
//   name: "Говяжий метеорит (отбивная)",
//   type: "main",
//   proteins: 800,
//   fat: 800,
//   carbohydrates: 300,
//   calories: 2674,
//   price: 3000,
//   image: "https://code.s3.yandex.net/react/code/meat-04.png",
//   image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
//   image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
//   __v: 0,
// },

function Ingredient({ data }) {
  return (
    <article className={`${styles.ingredient}`}>
      <Counter count={1} size="default" />
      <div className=" pr-4 pb-1 pl-4">
        <img src={data.image} alt={data.name} />
      </div>

      <h3 className={`${styles.price} text text_type_digits-default pb-2`}>
        <span className="pr-2">{data.price}</span>
        <CurrencyIcon type="primary" />
      </h3>

      <h3 className={`${styles.name} text text_type_main-default`}>
        {data.name}
      </h3>
    </article>
  );
}

Ingredient.propTypes = {};

export default Ingredient;
