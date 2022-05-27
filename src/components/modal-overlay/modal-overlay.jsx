import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({ children, closeHandler }) {
  const stopCloseHandler = (e) => {
    if (e.type === 'click') {
      e.stopPropagation();
    }
  };
  return (
    <div onClick={closeHandler} role="presentation" className={styles['modal-overlay']}>
      {/* Клик по ребенку не должен приводить к закрытию окна */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div onClick={stopCloseHandler} onKeyDown={stopCloseHandler} className={styles.children}>
        {children}
      </div>
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default ModalOverlay;
