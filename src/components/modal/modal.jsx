import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';

// todo 'детали ингридиента'
function Modal({ title = 'Детали ингредиента' }) {
  const modalNode = document.getElementById('modal');

  const ingredient = {
    _id: '60666c42cc7b410027a1a9b6',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
  };

  return createPortal(
    <article className={`${styles.modal} p-10 pb-15`}>
      <section className={`${styles.header}`}>
        <h2 className="text text_type_main-large">{title}</h2>
        <button className={styles['close-btn']} type="button">
          <CloseIcon type="primary" />
        </button>
      </section>
      <section className="" style={{ display: 'flex', justifyContent: 'center' }}>
        <IngredientDetails data={ingredient} />
      </section>
    </article>,
    modalNode,
  );
}

Modal.propTypes = {
  title: PropTypes.string,
};

Modal.defaultProps = {
  title: 'Детали ингредиента',
};

export default Modal;
