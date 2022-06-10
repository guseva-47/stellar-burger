import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import { fetchPostOrder } from '../../services/redusers/order';
import OrderDetails from '../order-details/order-details';
import BurgerConstructor from '../burger-constructor/burger-constructor';
// eslint-disable-next-line object-curly-newline
import { getBun, getCost, getOrderNumber, getStuffing } from '../../services/selectors/order';

import styles from './order-constructor.module.css';

function OrderConstructor() {
  const [isVisible, setIsVisible] = useState(false);
  const closeHandler = () => setIsVisible(false);
  const cost = useSelector(getCost);

  const stuffing = useSelector(getStuffing);
  const bun = useSelector(getBun);
  const isBurgerDone = bun && stuffing.length > 0;

  const dispatch = useDispatch();
  const orderNum = useSelector(getOrderNumber);

  const makeOrder = () => {
    if (!isBurgerDone) return;

    const items = [bun, ...stuffing];
    dispatch(fetchPostOrder(items));
    setIsVisible(true);
  };

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

        <Button type="primary" size="large" onClick={makeOrder} disabled={!isBurgerDone}>
          Оформить заказ
        </Button>

        {isVisible && orderNum && (
          <Modal closeHandler={closeHandler}>
            <OrderDetails number={orderNum} />
          </Modal>
        )}
      </div>
    </section>
  );
}

export default OrderConstructor;
