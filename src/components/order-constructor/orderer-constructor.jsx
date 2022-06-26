import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import { fetchPostOrder } from '../../services/redusers/order';
import OrderDetails from '../order-details/order-details';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {
  getBun,
  getCost,
  getOrderNumber,
  getStuffing,
  isOrderFailed,
  isOrderLoading,
} from '../../services/selectors/order';

import styles from './order-constructor.module.css';
import { getUserName } from '../../services/selectors/auth';

function OrderConstructor() {
  const auth = useSelector(getUserName);
  const navigate = useNavigate();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);
  const closeHandler = () => setIsVisible(false);
  const cost = useSelector(getCost);

  const stuffing = useSelector(getStuffing);
  const bun = useSelector(getBun);
  const isBurgerDone = bun && stuffing.length > 0;

  const dispatch = useDispatch();
  const orderNum = useSelector(getOrderNumber);

  const makeOrder = () => {
    if (!auth) navigate('/login', { state: { from: location } });

    if (!isBurgerDone) return;

    const items = [bun, ...stuffing];
    dispatch(fetchPostOrder(items));
    setIsVisible(true);
  };

  const isLoading = useSelector(isOrderLoading);
  const isFailed = useSelector(isOrderFailed);

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
          {isLoading ? 'Отправка' : 'Оформить заказ'}
        </Button>

        {isVisible && orderNum && (
          <Modal closeHandler={closeHandler}>
            <OrderDetails number={orderNum} />
          </Modal>
        )}
        {isVisible && isFailed && (
          <Modal closeHandler={closeHandler} title="Ошибка">
            <span className="text text_type_main-default">
              Неудалось сделать заказ. Попробуйте снова.
            </span>
          </Modal>
        )}
      </div>
    </section>
  );
}

export default OrderConstructor;
