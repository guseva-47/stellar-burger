import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient } from '../../../types/ingredient';

import styles from './bun.module.css';

type Props = {
  bun?: TIngredient;
  text?: string;
};

function BunTop({ bun, text }: Props) {
  return bun ? (
    <div className={`${styles.line} pl-8 pr-4 pb-4`}>
      <ConstructorElement
        type="top"
        isLocked
        text={`${bun.name} (верх)`}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  ) : (
    <div className={`${styles.line} pl-8 pr-4 pb-4`}>
      <div className={`${styles.bun} ${styles['bun-top']}`}>
        <span className="text text_type_main-default">{text}</span>
      </div>
    </div>
  );
}

BunTop.defaultProps = {
  bun: null,
  text: 'Добавьте булку',
};

export default BunTop;
