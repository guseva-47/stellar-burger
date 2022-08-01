import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientInOrder } from '../../types/ingredient';
import { TOrederStatus } from '../../types/order';

import styles from './feed-order-record.module.css';
import RecordIngredientsList from './record-ingredients-list';
import RecordTime from './record-time';

type Props = {
  ingredients: TIngredientInOrder[];
  status?: TOrederStatus;
  name: string;
  number: number;
  createdAt: string;
  withStatus: boolean;
};

function FeedOrderRecord({ createdAt, ingredients, name, number, status, withStatus }: Props) {
  // const ingredients = data;
  const cost = ingredients.reduce((prev, elem) => prev + elem.price, 0);

  return (
    <article className={styles.record}>
      <div className={styles.line}>
        <p className="text text_type_main-default">{`#${number}`}</p>
        <RecordTime createdAt={createdAt} />
      </div>
      <h2 className="text text_type_main-medium">{name}</h2>

      {withStatus && <p className="text text_type_main-default">{status}</p>}

      <div className={styles.line}>

        <RecordIngredientsList ingredients={ingredients} />

        <div className={`${styles.icon}`}>
          <span className="text text_type_digits-default mr-2">{cost}</span>
          <span>
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </div>
    </article>
  );
}

FeedOrderRecord.defaultProps = {
  status: null,
};

export default FeedOrderRecord;
