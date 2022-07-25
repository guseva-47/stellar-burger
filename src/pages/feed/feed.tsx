import FeedOrders from './feed-orders';
import styles from './feed.module.css';
import OrderBoard from './order-board';

function Feed() {
  return (
    <section className={styles.main}>
      <section className={`${styles.col} mr-20`}>
        <FeedOrders />
      </section>
      <section className={styles.col}>
        <OrderBoard />
      </section>
    </section>
  );
}

export default Feed;
