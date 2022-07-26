import FeedOrderRecord from './feed-order-record';

import styles from './feed-order-record.module.css';

function FeedOrders() {
  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large pb-5">Лента заказов</h1>

      {/* Блоки заказов */}
      <section className={`${styles.elements} custom-scroll`}>
        {Array.from(Array(30).keys()).map((i) => (
          <FeedOrderRecord key={i} />
        ))}
      </section>
    </section>
  );
}

export default FeedOrders;
