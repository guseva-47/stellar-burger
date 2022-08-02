import FeedOrders from '../../components/orders-feed/feed-orders';
import { useAppSelector } from '../../hooks/use-store';
import { feedWsApi } from '../../services/api/live-feed';
import { ordersSelector } from '../../services/selectors/live-feed';

import styles from './profile.module.css';

function Orders() {
  const { isSuccess } = feedWsApi.useGetOrdersQuery();
  const orders = useAppSelector(ordersSelector);

  return (
    <div className={styles.wrapper}>
      {isSuccess && <FeedOrders orders={orders} withStatus />}
    </div>
  );
}

export default Orders;
