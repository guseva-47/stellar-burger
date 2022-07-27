import FeedOrders from '../../components/orders-feed/feed-orders';
import OrderBoard from '../../components/order-board/order-board';

import styles from './feed.module.css';

function Feed() {
  return (
    <section className={styles.main}>
      <section className={`${styles.col} mr-20 pt-10`}>
        <h1 className="text text_type_main-large pb-5">Лента заказов</h1>
        <FeedOrders />
      </section>
      <section className={styles.col}>
        <OrderBoard />
      </section>
    </section>
  );
}

export default Feed;
