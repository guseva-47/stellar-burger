import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientPropTypes from '../../../types/ingredient-prop-types';
import styles from './bun.module.css';

function BunTop({ bun, text = 'Добавьте булку' }) {
  return bun ? (
    <ConstructorElement
      type="top"
      isLocked
      text={`${bun.name} (верх)`}
      price={bun.price}
      thumbnail={bun.image}
      className={`${styles.element}`}
    />
  ) : (
    <div className={`${styles.bun} ${styles['bun-top']}`}>
      <span className="text text_type_main-default">{text}</span>
    </div>
  );
}

BunTop.propTypes = {
  bun: ingredientPropTypes,
  text: PropTypes.string,
};

BunTop.defaultProps = {
  bun: null,
  text: 'Добавьте булку',
};

export default BunTop;
