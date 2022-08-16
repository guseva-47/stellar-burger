import { useAppSelector } from '../../hooks/use-store';
import {
  ordersSelector,
  totalOrderSelector,
  totalTodayOrderSelector,
} from '../../services/live-feed/live-feed.selector';
import { TOrederStatus } from '../../types/order';
import styles from './order-board.module.css';

function OrderBoard() {
  const total = useAppSelector(totalOrderSelector);
  const totalDay = useAppSelector(totalTodayOrderSelector);

  const orders = useAppSelector(ordersSelector);
  const readyOrders = () => orders.filter((order) => order.status === TOrederStatus.done);
  const pendingOrders = () => orders.filter((order) => order.status !== TOrederStatus.done);

  return (
    <section className="pt-25">
      <div className={`${styles.line} pb-15`}>
        <article className={styles.board}>
          <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
          <div className={styles.line}>
            {[0, 1].map((i) => (
              <ul className={styles.numbers} key={i}>
                {readyOrders()
                  .slice(i, i + 10)
                  .map((order) => (
                    <li
                      className={`${styles.num} text text_type_digits-default`}
                      key={order.number}
                    >
                      {order.number}
                    </li>
                  ))}
              </ul>
            ))}
          </div>
        </article>

        <article className={styles.board}>
          <h2 className="text text_type_main-medium pb-6">В работе:</h2>
          <div className={styles.line}>
            {[0, 1].map((i) => (
              <ul className={styles.numbers} key={i}>
                {pendingOrders()
                  .slice(i, i + 10)
                  .map((order) => (
                    <li className="text text_type_digits-default" key={order.number}>
                      {order.number}
                    </li>
                  ))}
              </ul>
            ))}
          </div>
        </article>
      </div>
      <section className="pb-15">
        <h2 className="text text_type_main-medium">Выполнено за все время</h2>
        <h2 className={`${styles.amount} text text_type_digits-large`}>{total}</h2>
      </section>
      <section className="pb-15">
        <h2 className="text text_type_main-medium">Выполнено за сегодня</h2>
        <h2 className={`${styles.amount} text text_type_digits-large`}>{totalDay}</h2>
      </section>
    </section>
  );
}

export default OrderBoard;
