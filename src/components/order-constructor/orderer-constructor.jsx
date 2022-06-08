import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-constructor.module.css';
import ingredientPropTypes from '../prop-types/ingredient-prop-types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function OrderConstructor({ bun, ingredients }) {
  const calcPrice = () => 610;
  const [isVisible, setIsVisible] = useState(false);
  const closeHandler = () => setIsVisible(false);

  return (
    <section className="pt-25 pl-4">
      <div className={`${styles.elements} pb-10`}>
        <BurgerConstructor bun={bun} ingredients={ingredients} />
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

OrderConstructor.propTypes = {
  bun: ingredientPropTypes.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default OrderConstructor;
