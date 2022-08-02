import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useAppSelector } from '../../hooks/use-store';
import { getAllIngredients } from '../../services/selectors/app';
import { TIngredientInOrder } from '../../types/ingredient';
import { TOrder } from '../../types/order';
import FeedOrderRecord from './feed-order-record';

import styles from './feed-order-record.module.css';

type Props = {
  orders: TOrder[]
  withStatus: boolean
};

function FeedOrders({ orders, withStatus }: Props) {
  const location = useLocation();
  const ingredients = useAppSelector(getAllIngredients);
  const ingredientsInOrder = (order: TOrder) => {
    const elems = order.ingredients.map((id) => {
      const elem = ingredients.find((ingredient) => ingredient._id === id);
      return elem ? ({ ...elem, uuid: uuidv4() } as TIngredientInOrder) : null;
    });
    return elems.filter((elem) => elem !== null) as TIngredientInOrder[];
  };

  return (
    <section className={`${styles.elements} custom-scroll`}>
      {orders.map((order) => (
        <Link
          to={`${order.number}`}
          state={{ backgroundLocation: location }}
          className={styles.link}
          key={order._id}
        >
          <FeedOrderRecord
            createdAt={order.createdAt}
            ingredients={ingredientsInOrder(order)}
            name={order.name}
            number={order.number}
            withStatus={withStatus}
            status={order.status}
          />
        </Link>
      ))}
    </section>
  );
}

export default FeedOrders;
