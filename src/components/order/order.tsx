import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';

import TLocation from '../../types/location';
import { fetchGetOrder } from '../../services/app/app.reducer';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import { getAllIngredients, getOrder } from '../../services/app/app.selector';
import RecordTime from '../orders-feed/record-time';
import { TIngredientInOrder, TypesOfIngredients } from '../../types/ingredient';
import IngredientLine from './ingredient-line';
import { TOrederStatusALias } from '../../types/order';

import styles from './order.module.css';

function Order() {
  const location = useLocation();
  const cName = !(location as TLocation).state?.backgroundLocation ? 'pt-30' : '';

  const dispatch = useAppDispatch();
  const { num } = useParams();
  useEffect(() => {
    if (!num) return;
    dispatch(fetchGetOrder(num));
  }, [dispatch, num]);

  const order = useAppSelector(getOrder);

  const allIngredients = useAppSelector(getAllIngredients);
  const ingredientsInOrder = () => {
    if (!order) return [];
    const elems = order.ingredients.map((id) => {
      const elem = allIngredients.find((ingredient) => ingredient._id === id);
      return elem ? ({ ...elem, uuid: uuidv4() } as TIngredientInOrder) : null;
    });
    return elems.filter((elem) => elem !== null) as TIngredientInOrder[];
  };

  const cost = () => {
    const bun = ingredientsInOrder().find((elem) => elem.type === TypesOfIngredients.bun);
    const bunCost = bun ? bun.price : 0;
    return ingredientsInOrder().reduce((prev, elem) => prev + elem.price, bunCost);
  };

  return (
    <section className={`${styles.order} ${cName}`}>
      {order && `${order.number}` === num && (
        <div className={styles.wrapper}>
          <p className={`${styles.header} text text_type_digits-default pb-10`}>
            {`#${order.number}`}
          </p>

          <h2 className="text text_type_main-medium pb-3">{order.name}</h2>
          <p className={`${styles['status-done']} text text_type_main-small`}>
            {TOrederStatusALias[order.status]}
          </p>
          <h3 className="text text_type_main-medium pt-15 pb-6">Состав:</h3>
          <ul className={`${styles.ingredients} custom-scroll pb-10`}>
            {ingredientsInOrder().map((ingredient) => (
              <IngredientLine ingredient={ingredient} key={ingredient.uuid} />
            ))}
          </ul>
          <div className={`${styles.line} pt-15`}>
            <RecordTime createdAt={order.createdAt} />
            <div className={styles.price}>
              <p className="text text_type_digits-default pr-2">{cost()}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Order;
