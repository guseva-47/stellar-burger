import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredientInOrder } from '../../../types/ingredient';
import { removeStuffing } from '../../../services/order/order.reducer';
import { useAppDispatch } from '../../../hooks/use-store';

import styles from './stuffing.module.css';

type Props = {
  ingredient?: TIngredientInOrder;
  text?: string;
  index?: number;
  moveCard?: (dragIndex: number, hoverIndex: number) => void;
};

type TDragStuffing = {
  id: string;
  index: number;
};

function Stuffing({ ingredient, moveCard, index, text }: Props) {
  const dispatch = useAppDispatch();

  const deleteStuffing = () => {
    if (!ingredient) return;
    dispatch(removeStuffing(ingredient));
  };

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<TDragStuffing, void, { handlerId: Identifier | null }>({
    accept: 'stuffing',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ingredient || index === undefined || !ref.current || !moveCard) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = (ref.current as any)?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'stuffing',
    item: (): TDragStuffing => ({ id: ingredient?._id ?? '', index: index ?? 0 }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return !ingredient ? (
    <div className="pl-8 pr-4">
      <div className={styles.ingredient}>
        <span className="text text_type_main-default">{text}</span>
      </div>
    </div>
  ) : (
    <div className={`${styles.line} ${isDragging ? styles.invis : ''}`} ref={ref}>
      <span className={`${styles['drag-icon']} pr-2`}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={deleteStuffing}
      />
    </div>
  );
}

Stuffing.defaultProps = {
  ingredient: null,
  text: 'Добавьте начинку',
  index: 0,
  moveCard: () => console.error('Невозможно переместить объект'),
};

export default Stuffing;
