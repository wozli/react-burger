import React from 'react';
import PropTypes from "prop-types";
import CategoryItemStyles from "./CategoryItem.module.scss";
import Title from "../common/title/Title";
import ProductCard from "../product-card/ProductCard";
import {PROP_INGREDIENTS} from "../utils/propTypes";

function CategoryItem({category, selectIngredient}) {
  return (
      <div className={CategoryItemStyles.category}
           name={category.id}>
        <Title type='medium'
               classes='mb-6'
               text={category.text}/>
        <div className={CategoryItemStyles.grid}>
          {category.items.map(product => (
              <ProductCard key={product._id}
                           clickProduct={selectIngredient}
                           product={product}/>
          ))}
        </div>
      </div>
  )
}

CategoryItem.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PROP_INGREDIENTS.isRequired).isRequired
  }),
  selectIngredient: PropTypes.func.isRequired
};

export default CategoryItem;