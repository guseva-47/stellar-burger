import styles from './modal-overlay.module.css';

type Props = {
  closeHandler: () => void;
};

function ModalOverlay({ closeHandler }: Props) {
  return <div onClick={closeHandler} role="presentation" className={styles['modal-overlay']} />;
}

export default ModalOverlay;
