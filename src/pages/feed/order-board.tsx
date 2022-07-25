import styles from './order-board.module.css';

function OrderBoard() {
  return (
    <section className="pt-25">
      <div className={`${styles.line} pb-15`}>
        <article className={styles.board}>
          <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
          <ul className={styles.numbers}>
            <li className={`${styles.num} text text_type_digits-default`}>034533</li>
            <li className={`${styles.num} text text_type_digits-default`}>034533</li>
            <li className={`${styles.num} text text_type_digits-default`}>034533</li>
            <li className={`${styles.num} text text_type_digits-default`}>034533</li>
            <li className={`${styles.num} text text_type_digits-default`}>034533</li>
            <li className={`${styles.num} text text_type_digits-default`}>034533</li>
          </ul>
        </article>

        <article className={styles.board}>
          <h2 className="text text_type_main-medium pb-6">В работе:</h2>
          <ul className={styles.numbers}>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034533</li>
          </ul>
        </article>
      </div>
      <section className="pb-15">
        <h2 className="text text_type_main-medium">Выполнено за все время</h2>
        <h2 className={`${styles.amount} text text_type_digits-large`}>28 752</h2>
      </section>
      <section className="pb-15">
        <h2 className="text text_type_main-medium">Выполнено за сегодня</h2>
        <h2 className={`${styles.amount} text text_type_digits-large`}>138</h2>
      </section>
    </section>
  );
}

export default OrderBoard;
