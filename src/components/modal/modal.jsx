import { createRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

function Modal({ children, title = '', closeHandler }) {
  const modalNode = document.getElementById('modal');

  const modalRef = createRef();

  useEffect(() => {
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    };
    modalRef.current.focus();
    document.addEventListener('keydown', escapeHandler);

    return () => document.removeEventListener('keydown', escapeHandler);
  }, [modalRef, closeHandler]);

  return createPortal(
    <ModalOverlay closeHandler={closeHandler}>
      <article className={`${styles.modal} p-10 pb-15`} ref={modalRef} tabIndex={-1}>
        {/* header */}
        <section className={`${styles.header}`}>
          <h2 className="text text_type_main-large">{title}</h2>

          <button className={styles['close-btn']} type="button" onClick={closeHandler}>
            <CloseIcon type="primary" />
          </button>
        </section>

        {/* main */}
        <section style={{ display: 'flex', justifyContent: 'center' }}>{children}</section>
      </article>
    </ModalOverlay>,
    modalNode
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  closeHandler: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  title: '',
};

export default Modal;
