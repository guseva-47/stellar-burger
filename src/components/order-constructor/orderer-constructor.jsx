import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getCost } from '../../services/selectors/order';

function OrderConstructor() {
  const [isVisible, setIsVisible] = useState(false);
  const closeHandler = () => setIsVisible(false);
  const cost = useSelector(getCost);

  return (
    <section className="pt-25 pl-4">
      <div className={`${styles.elements} pb-10`}>
        <BurgerConstructor />
      </div>

      <div className={`${styles.footer} pr-4`}>
        <span className="text text_type_digits-medium pr-2">{cost}</span>
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

export default OrderConstructor;
