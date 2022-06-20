import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { removeStuffing } from '../../../services/redusers/order';
import ingredientPropTypes from '../../../types/ingredient-prop-types';

import styles from './stuffing.module.css';

// eslint-disable-next-line object-curly-newline
function Stuffing({ ingredient = {}, moveCard, index, text = 'Добавьте начинку' }) {
  const dispatch = useDispatch();

  const deleteStuffing = () => {
    dispatch(removeStuffing(ingredient));
  };

  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'stuffing',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ingredient) return;
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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
    item: () => ({ id: ingredient._id, index }),
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
        className={`${styles.element}`}
        handleClose={deleteStuffing}
      />
    </div>
  );
}

Stuffing.propTypes = {
  ingredient: ingredientPropTypes,
  text: PropTypes.string,
  index: PropTypes.number,
  moveCard: PropTypes.func,
};

Stuffing.defaultProps = {
  ingredient: null,
  text: 'Добавьте начинку',
  index: 0,
  moveCard: () => console.error('Невозможно переместить объект'),
};

export default Stuffing;
