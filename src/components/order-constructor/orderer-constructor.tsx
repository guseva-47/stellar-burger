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

  const [isSended, setIsSended] = useState(false);
  const closeHandler = () => setIsSended(false);
  const cost = useSelector(getCost);

  const stuffing = useSelector(getStuffing);
  const bun = useSelector(getBun);
  const isBurgerDone = bun && stuffing.length > 0;

  const dispatch = useDispatch();
  const orderNum = useSelector(getOrderNumber);

  const makeOrder = () => {
    if (!auth) {
      navigate('/login', { state: { from: location } });
      return;
    }

    if (!isBurgerDone) return;

    const items = [bun, ...stuffing];
    
    // todo
    // @ts-ignore
    dispatch(fetchPostOrder(items));
    setIsSended(true);
  };

  const isLoading = useSelector(isOrderLoading);
  const isFailed = useSelector(isOrderFailed);

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
          {isLoading ? '????????????????' : '???????????????? ??????????'}
        </Button>

        {isSended && !isLoading && orderNum && (
          <Modal closeHandler={closeHandler}>
            <OrderDetails number={orderNum} />
          </Modal>
        )}
        {isSended && isFailed && (
          <Modal closeHandler={closeHandler} title="????????????">
            <div className="pt-10">
              <span className="text text_type_main-default">
                ???? ?????????????? ?????????????? ??????????. ???????????????????? ??????????.
              </span>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}

export default OrderConstructor;
