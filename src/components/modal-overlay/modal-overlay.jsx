import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({ children, closeHandler }) {
  const stopCloseHandler = (e) => e.stopPropagation();

  return (
    <button onClick={closeHandler} className={styles['modal-overlay']} type="button">
      {/* Клик по ребенку не должен приводить к закрытию окна */}
      {/* Правило eslint отключено, т.к. элемент только перехватывает всплывающее событие */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div onClick={stopCloseHandler} onKeyDown={stopCloseHandler} className={styles.children}>
        {children}
      </div>
    </button>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default ModalOverlay;
