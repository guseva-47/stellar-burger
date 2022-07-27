import { Link, useLocation } from 'react-router-dom';
import FeedOrderRecord from './feed-order-record';

import styles from './feed-order-record.module.css';

function FeedOrders() {
  const location = useLocation();

  return (
    <section className={`${styles.elements} custom-scroll`}>
      {Array.from(Array(30).keys()).map((i) => (
        <Link to={`${i}`} state={{ backgroundLocation: location }} className={styles.link}>
          <FeedOrderRecord key={i} />
        </Link>
      ))}
    </section>
  );
}

export default FeedOrders;
