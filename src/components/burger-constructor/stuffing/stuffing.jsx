import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { removeStuffing } from '../../../services/redusers/order';
import ingredientPropTypes from '../../../types/ingredient-prop-types';
import styles from './stuffing.module.css';

function Stuffing({ ingredient = {}, text = 'Добавьте начинку' }) {
  const dispatch = useDispatch();

  const deleteStuffing = () => {
    dispatch(removeStuffing(ingredient));
  };

  return !ingredient ? (
    <div className="pl-8 pr-4">
      <div className={styles.ingredient}>
        <span className="text text_type_main-default">{text}</span>
      </div>
    </div>
  ) : (
    <div className={styles.line}>
      <span className="pr-2">
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        className={`${styles.element}`}
        handleClose={deleteStuffing}
      />
    </div>
  );
}

Stuffing.propTypes = {
  ingredient: ingredientPropTypes,
  text: PropTypes.string,
};

Stuffing.defaultProps = {
  ingredient: null,
  text: 'Добавьте начинку',
};

export default Stuffing;
