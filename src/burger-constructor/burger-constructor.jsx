import React from "react";
import PropTypes from "prop-types";

import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import dataSet from "../utils/data";
import styles from "./burger-constructor.module.css";
function BurgerConstructor(props) {
  const calcPrice = () => {
    return 610;
  };
  return (
    <section className={`pt-25 pl-4`}>
      <div className={`${styles.elements} pb-10`}>
        <div className={`${styles.line} pl-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-01.png"}
            className={`${styles.element}`}
          />
        </div>
        <div className={`${styles.middle} ${styles.elements} custom-scroll`}>
          {dataSet.map((data) => {
            return (
              <div className={`${styles.line}`}>
                <span className="pr-2">
                  <DragIcon type="primary" />
                </span>
                <ConstructorElement
                  text={data.name}
                  price={data.price}
                  thumbnail={data.image}
                  className={`${styles.element}`}
                  key={data._id}
                />
              </div>
            );
          })}
        </div>

        <div className={`${styles.line} pl-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-01.png"}
            className={`${styles.element}`}
          />
        </div>
      </div>

      <div className={`${styles.footer} pr-4`}>
        <span className="text text_type_digits-medium pr-2">{calcPrice()}</span>
        <span className="pr-10">
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {};

export default BurgerConstructor;
