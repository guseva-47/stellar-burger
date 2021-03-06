import { createRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Outlet } from 'react-router-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

type Props = {
  title?: string;
  closeHandler: () => void;
  children?: JSX.Element;
};

function Modal({ title = '', closeHandler, children }: Props) {
  const modalNode = document.getElementById('modal') as HTMLElement;

  const modalRef = createRef<HTMLElement>();

  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    };
    modalRef.current?.focus();
    document.addEventListener('keydown', escapeHandler);

    return () => document.removeEventListener('keydown', escapeHandler);
  }, [modalRef, closeHandler]);

  return createPortal(
    <div className={styles.wrapper}>
      <article className={`${styles.modal} p-10 pb-15`} ref={modalRef} tabIndex={-1}>
        {/* header */}
        <section className={`${styles.header}`}>
          <h2 className="text text_type_main-large">{title}</h2>

          <button className={styles['close-btn']} type="button" onClick={closeHandler}>
            <CloseIcon type="primary" />
          </button>
        </section>

        {/* main */}
        <section className={styles.main}>
          <Outlet />
          {children && <div>{children}</div>}
        </section>
      </article>
      <ModalOverlay closeHandler={closeHandler} />
    </div>,
    modalNode
  );
}

Modal.defaultProps = {
  title: '',
  children: null
};

export default Modal;
