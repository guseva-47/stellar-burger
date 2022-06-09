import PropTypes from 'prop-types';

import styles from './stuffing.module.css';

function Stuffing({ text = 'Добавьте начинку' }) {
  return (
    <div className="pl-8 pr-4">
      <div className={styles.ingredient}>
        <span className="text text_type_main-default">{text}</span>
      </div>
    </div>
  );
}

Stuffing.propTypes = {
  text: PropTypes.string,
};

Stuffing.defaultProps = {
  text: 'Добавьте начинку',
};

export default Stuffing;
