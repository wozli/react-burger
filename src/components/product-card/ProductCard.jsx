import React, {useMemo} from 'react';
import ProductCardStyles from './ProductCard.module.scss';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from "react-dnd";
import {PROP_INGREDIENTS} from "../utils/propTypes";
import classNames from "classnames";
import {useSelector} from "react-redux";
import {TYPE_INGREDIENTS} from "../utils/constants";
import {useLocation, Link} from 'react-router-dom';

function ProductCard({product}) {
  const location = useLocation();
  const {ingredients, bun} = useSelector(state => state.constructorReducer);

  const [{isDrag}, dragRef] = useDrag({
    type: 'ingredient',
    item: product,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const countInCart = useMemo(() => {
    if (product.type === TYPE_INGREDIENTS.BUN && bun?._id) {
      return bun._id === product._id ? 2 : 0;
    }
    return ingredients.reduce((acc, item) => item._id === product._id ? acc + 1 : acc, 0)
  }, [ingredients, bun, product])

  const productClass = classNames(ProductCardStyles.card, {
    [ProductCardStyles.card__isDrag]: isDrag,
  });

  const ingredientId = product['_id'];

  return (
      <Link className={productClass}
           ref={dragRef}
            key={ingredientId}
            to={{
              pathname: `/ingredients/${ingredientId}`,
              state: { background: location },
            }}
      >
        <img className={`${ProductCardStyles.card__img} mb-1`}
             src={product.image}
             alt={product.name}/>
        <div className={`${ProductCardStyles.card__price} mb-1`}>
          <p className={`${ProductCardStyles.card__text} text text_type_digits-default mr-1`}>{product.price}</p>
          <CurrencyIcon type="primary"/>
        </div>
        <p className={`${ProductCardStyles.card__text} text text_type_main-default`}>
          {product.name}
        </p>
        <div className={ProductCardStyles.card__counter}>
          {countInCart > 0 && (
              <Counter count={countInCart} size="small"/>
          )}
        </div>
      </Link>
  );
}

ProductCard.propTypes = {
  product: PROP_INGREDIENTS.isRequired,
};

export default ProductCard;
