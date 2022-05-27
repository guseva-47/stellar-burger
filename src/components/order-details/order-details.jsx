import PropTypes from 'prop-types';

import styles from './order-details.module.css';
import doneIcon from '../../images/done.svg';

function OrderDetails({ number = '' }) {
  return (
    <article className={`${styles['order-details']} pt-4`}>
      <h2 className={`${styles.number} text text_type_digits-large pb-8`}>{number}</h2>
      <span className="pb-15 text text_type_main-medium">идентификатор заказа</span>
      <img className="pb-15" src={doneIcon} alt="ok" />
      <h3 className="pb-2 text text_type_main-default">Ваш заказ начали готовить</h3>
      <span className="pb-15 text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </article>
  );
}

OrderDetails.propTypes = {
  number: PropTypes.string.isRequired,
};

export default OrderDetails;
