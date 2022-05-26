import { createRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import ingredientPropTypes from '../prop-types/ingredient-prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal({ title = '', ingredient = {}, closeHandler }) {
  const modalNode = document.getElementById('modal');

  const closeRef = createRef();

  useEffect(() => {
    closeRef.current.focus();
  }, []);

  return createPortal(
    <ModalOverlay closeHandler={closeHandler}>
      <article className={`${styles.modal} p-10 pb-15`}>
        {/* header */}
        <section className={`${styles.header}`}>
          <h2 className="text text_type_main-large">{title}</h2>

          <button
            className={styles['close-btn']}
            type="button"
            onClick={closeHandler}
            ref={closeRef}
          >
            <CloseIcon type="primary" />
          </button>
        </section>

        {/* main */}
        <section style={{ display: 'flex', justifyContent: 'center' }}>
          <IngredientDetails data={ingredient} />
        </section>
      </article>
    </ModalOverlay>,
    modalNode,
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  ingredient: ingredientPropTypes.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  title: '',
};

export default Modal;
