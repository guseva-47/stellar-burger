import FeedOrders from '../../components/orders-feed/feed-orders';
import { useAppSelector } from '../../hooks/use-store';
import { privateFeedWsApi } from '../../services/api/private-live-feed';
import { ordersSelector } from '../../services/order-history/history.selector';

import styles from './profile.module.css';

function Orders() {
  const { isSuccess } = privateFeedWsApi.useGetPrivateOrdersQuery();
  const orders = useAppSelector(ordersSelector);

  return (
    <div className={styles.wrapper}>
      {isSuccess && <FeedOrders orders={orders} withStatus />}
    </div>
  );
}

export default Orders;
