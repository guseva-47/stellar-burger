import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient } from '../../../types/ingredient';

import styles from './bun.module.css';

type Props = {
  bun?: TIngredient;
  text?: string;
};

function BunBottom({ bun, text }: Props) {
  return bun ? (
    <div className={`${styles.line} pl-8 pr-4 pt-4`}>
      <ConstructorElement
        type="bottom"
        isLocked
        text={`${bun.name} (низ)`}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  ) : (
    <div className={`${styles.line} pl-8 pr-4 pt-4`}>
      <div className={`${styles.bun} ${styles['bun-bottom']}`}>
        <span className="text text_type_main-default">{text}</span>
      </div>
    </div>
  );
}

BunBottom.defaultProps = {
  bun: null,
  text: 'Добавьте булку',
};

export default BunBottom;
