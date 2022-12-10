import React, {FC} from 'react';
import CategoryItemStyles from "./CategoryItem.module.scss";
import Title from "../common/title/Title";
import ProductCard from "../product-card/ProductCard";
import type {TIngredientsCategories} from "../utils/types";
import { DOMAttributes } from "react";

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        name?: string;
    }
}

export const CategoryItem: FC<{category:TIngredientsCategories}> = ({category}) => {
  return (
      <div className={CategoryItemStyles.category}
           ref={category.ref}
           name={category.id}>
        <Title type='medium'
               classes='mb-6'
               text={category.text}/>
        <div className={CategoryItemStyles.grid}>
          {category.items.map((product) => (
              <ProductCard key={product._id}
                           product={product}/>
          ))}
        </div>
      </div>
  )
}

export default CategoryItem;