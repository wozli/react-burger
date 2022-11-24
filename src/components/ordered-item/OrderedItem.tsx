import React, {useRef, FC} from 'react';
import {useDrop, useDrag, XYCoord} from "react-dnd";
import OrderedItemStyles from './OrderedItem.module.scss';
import classNames from "classnames";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import type {TIngredient} from "../utils/types";

type TOrderedItemProps = {
  item: TIngredient,
  type: 'top' | undefined | 'bottom',
  isBun: boolean,
  deleteCartIngredient?: (item:TIngredient, index:number) => void,
  index?: number,
  moveCard: (dragIndex:number, hoverIndex:number) => void,
}

const OrderedItem:FC<TOrderedItemProps> = ({item, type, isBun, deleteCartIngredient, index, moveCard}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index ? index : 0;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: XYCoord | null = monitor.getClientOffset();

      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;
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
    item: () => ({ id: item._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  if (!isBun) drag(drop(ref));
  const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

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
                            handleClose={() => deleteCartIngredient && (index === 0 || !!index) ? deleteCartIngredient(item, index) : null}
                            thumbnail={item.image}
                            type={type}
                            isLocked={isBun}
                            price={item.price}/>
      </div>
  );
}

export default OrderedItem;
