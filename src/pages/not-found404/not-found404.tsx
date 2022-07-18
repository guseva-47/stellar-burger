import { Link } from 'react-router-dom';
import styles from './not-found404.module.css';

function NotFound404() {
  return (
    <section className={`${styles.text}`}>
      <h2 className="text text_type_main-large pb-4">Страница не найдена. Ошибка 404.</h2>
      <Link to="/" className={`text text_type_main-large ${styles.link}`}>
        На главную
      </Link>
    </section>
  );
}

export default NotFound404;
