import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import ingredientPropTypes from '../../prop-types/ingredient-prop-types';
import styles from './bun.module.css';

function BunBottom({ bun, text = 'Добавьте булку' }) {
  return bun ? (
    <ConstructorElement
      type="bottom"
      isLocked
      text={`${bun.name} (низ)`}
      price={bun.price}
      thumbnail={bun.image}
      className={`${styles.element}`}
    />
  ) : (
    <div className={`${styles.bun} ${styles['bun-bottom']}`}>
      <span className="text text_type_main-default">{text}</span>
    </div>
  );
}

BunBottom.propTypes = {
  bun: ingredientPropTypes,
  text: PropTypes.string,
};

BunBottom.defaultProps = {
  bun: null,
  text: 'Добавьте булку',
};

export default BunBottom;
