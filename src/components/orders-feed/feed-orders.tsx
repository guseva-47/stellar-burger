import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-store';
import { api } from '../../services/api/live-feed';
import { ordersSelector } from '../../services/selectors/live-feed';
import FeedOrderRecord from './feed-order-record';

import styles from './feed-order-record.module.css';

function FeedOrders() {
  const location = useLocation();
  const { isSuccess } = api.useGetOrdersQuery();
  const orders = useAppSelector(ordersSelector);

  return (
    <section className={`${styles.elements} custom-scroll`}>
      { isSuccess && orders.map((order) => (
        <Link to={`${order}`} state={{ backgroundLocation: location }} className={styles.link}>
          <FeedOrderRecord key={order._id} />
        </Link>
      ))}
    </section>
  );
}

export default FeedOrders;
