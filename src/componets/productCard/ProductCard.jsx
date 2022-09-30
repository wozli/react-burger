import React from 'react';
import ProductCardStyles from './ProductCard.module.scss';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function ProductCard(props) {

  return (
      <div className={ProductCardStyles.card}>
        <img className={`${ProductCardStyles.card__img} mb-1`}
             src={props.product.image}
             alt=''/>
        <div className={`${ProductCardStyles.card__price} mb-1`}>
          <p className={`${ProductCardStyles.card__text} text text_type_digits-default mr-1`}>{props.product.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`${ProductCardStyles.card__text} text text_type_main-default`}>
          {props.product.name}
        </p>
        <div className={ProductCardStyles.card__counter}>
          <Counter count={1} size="small"/>
        </div>
      </div>
  );
}

export default ProductCard;
