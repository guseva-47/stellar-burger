import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './modal.module.css';

// todo 'детали ингридиента'
function Modal({ title = 'Детали ингредиента' }) {
  return (
    <article className={`${styles.modal} p-10 pb-15`}>
      <section className={`${styles.header}`}>
        <h2 className="text text_type_main-large">{title}</h2>
        <CloseIcon type="primary" />
      </section>
    </article>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
};

Modal.defaultProps = {
  title: '',
};

export default Modal;
