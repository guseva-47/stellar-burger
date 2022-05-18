import React from "react";
import PropTypes from "prop-types";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import dataSet from "../utils/data";
import styles from "./burger-constructor.module.css";
function BurgerConstructor(props) {
  return (
    <section className={`${styles.constructor} pt-25 pl-4`}>
      <div className={`${styles.elements} custom-scroll`}>
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
              />
            </div>
          );
        })}
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
    </section>
  );
}

BurgerConstructor.propTypes = {};

export default BurgerConstructor;
