import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import { fetchPostOrder } from '../../services/order/order.reducer';
import OrderDetails from '../order-details/order-details';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {
  getBun,
  getCost,
  getOrderNumber,
  getStuffing,
  isOrderFailed,
  isOrderLoading,
} from '../../services/order/order.selector';
import { getUserName } from '../../services/auth/auth.selector';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';

import styles from './order-constructor.module.css';

function OrderConstructor() {
  const auth = useAppSelector(getUserName);
  const navigate = useNavigate();
  const location = useLocation();

  const [isSended, setIsSended] = useState(false);
  const closeHandler = () => setIsSended(false);
  const cost = useAppSelector(getCost);

  const stuffing = useAppSelector(getStuffing);
  const bun = useAppSelector(getBun);
  const isBurgerDone = bun && stuffing.length > 0;

  const dispatch = useAppDispatch();
  const orderNum = useAppSelector(getOrderNumber);

  const makeOrder = () => {
    if (!auth) {
      navigate('/login', { state: { from: location } });
      return;
    }

    if (!isBurgerDone) return;

    const items = [bun, ...stuffing];

    dispatch(fetchPostOrder(items));
    setIsSended(true);
  };

  const isLoading = useAppSelector(isOrderLoading);
  const isFailed = useAppSelector(isOrderFailed);

  return (
    <section className="pt-20 pl-4">
      <div className={`${styles.elements} pb-5`}>
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

        {isSended && !isLoading && orderNum && (
          <Modal closeHandler={closeHandler}>
            <OrderDetails number={`${orderNum}`} />
          </Modal>
        )}
        {isSended && isFailed && (
          <Modal closeHandler={closeHandler} title="Ошибка">
            <div className="pt-10">
              <span className="text text_type_main-default">
                Не удается сделать заказ. Попробуйте снова.
              </span>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}

export default OrderConstructor;
