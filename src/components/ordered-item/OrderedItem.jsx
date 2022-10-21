import React, {useRef} from 'react';
import {useDrop, useDrag} from "react-dnd";
import OrderedItemStyles from './OrderedItem.module.scss';
import classNames from "classnames";
import PropTypes from "prop-types";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {PROP_INGREDIENTS} from "../utils/propTypes";


function OrderedItem({item, type, isBun, deleteCartIngredient, index, moveCard}) {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
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
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  if (!isBun) drag(drop(ref));
  const preventDefault = (e) => e.preventDefault();

  const mainClass = classNames( {
    [OrderedItemStyles.item]: true,
    [OrderedItemStyles.item__grab]: !isBun,
    'ml-8': isBun,
    [OrderedItemStyles.item__isDragging]: isDragging,
  });

  return (
      <div ref={ref}
           className={mainClass}
           data-handler-id={handlerId}
           onDrop={preventDefault}>
        {!isBun && (
            <div className='mr-2'>
              <DragIcon type="primary"/>
            </div>
        )}
        <ConstructorElement text={`${item.name} ${type === 'top' ? '(верх)' : type === 'bottom' ? '(низ)' : ''}`}
                            handleClose={() => deleteCartIngredient(item, index)}
                            thumbnail={item.image}
                            type={type}
                            isLocked={isBun}
                            price={item.price}/>
      </div>
  );
}

OrderedItem.propTypes = {
  item: PROP_INGREDIENTS.isRequired,
  type: PropTypes.string.isRequired,
  isBun: PropTypes.bool.isRequired,
  index: PropTypes.number,
  deleteCartIngredient: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
};

export default OrderedItem;
