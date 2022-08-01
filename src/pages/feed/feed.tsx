import { ordersSelector } from '../../services/selectors/live-feed';
import FeedOrders from '../../components/orders-feed/feed-orders';
import OrderBoard from '../../components/order-board/order-board';
import { feedWsApi } from '../../services/api/live-feed';
import { useAppSelector } from '../../hooks/use-store';

import styles from './feed.module.css';

function Feed() {
  const { isSuccess } = feedWsApi.useGetOrdersQuery();
  const orders = useAppSelector(ordersSelector);
  return (
    <section className={styles.main}>
      <section className={`${styles.col} mr-20 pt-10`}>
        <h1 className="text text_type_main-large pb-5">Лента заказов</h1>
        {isSuccess && <FeedOrders orders={orders} withStatus={false} />}
      </section>
      <section className={styles.col}>
        <OrderBoard />
      </section>
    </section>
  );
}

export default Feed;
