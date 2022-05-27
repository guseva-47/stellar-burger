import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({ closeHandler }) {
  return <div onClick={closeHandler} role="presentation" className={styles['modal-overlay']} />;
}

ModalOverlay.propTypes = {
  closeHandler: PropTypes.func.isRequired,
};

export default ModalOverlay;
