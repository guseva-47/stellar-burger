import FeedOrders from '../../components/orders-feed/feed-orders';

import styles from './profile.module.css';

function Orders() {
  return (
    <div className={styles.wrapper}>
      <FeedOrders />
    </div>
  );
}

export default Orders;
