import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import ingredientPropTypes from '../prop-types/ingredient-prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

function BurgerConstructor({ bun, ingredients }) {
  const calcPrice = () => 610;
  const [isVisible, setIsVisible] = useState(false);
  const closeHandler = () => setIsVisible(false);

  return (
    <section className="pt-25 pl-4">
      <div className={`${styles.elements} pb-10`}>
        <div className={`${styles.line} pl-8`}>
          <ConstructorElement
            type="top"
            isLocked
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            className={`${styles.element}`}
          />
        </div>
        <div className={`${styles.middle} ${styles.elements} custom-scroll`}>
          {ingredients.map((data, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={`${styles.line}`} key={i}>
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
          ))}
        </div>

        <div className={`${styles.line} pl-8`}>
          <ConstructorElement
            type="bottom"
            isLocked
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            className={`${styles.element}`}
          />
        </div>
      </div>

      <div className={`${styles.footer} pr-4`}>
        <span className="text text_type_digits-medium pr-2">{calcPrice()}</span>
        <span className="pr-10">
          <CurrencyIcon type="primary" />
        </span>

        <Button type="primary" size="large" onClick={() => setIsVisible(true)}>
          Оформить заказ
        </Button>

        {isVisible && (
          <Modal closeHandler={closeHandler}>
            <OrderDetails number="034536" />
          </Modal>
        )}
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  bun: ingredientPropTypes.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;
