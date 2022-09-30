import React from 'react';
import BurgerIngredients from "../../componets/burgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../componets/burgerConstructor/BurgerConstructor";
import ConstructorStyles from './Constructor.module.scss';
import {PRODUCTS} from "../../componets/utils/data";

function Constructor() {
  return (
      <main className={ConstructorStyles.constructor}>
        <div className={`${ConstructorStyles.constructor__inner} container`}>
            <BurgerIngredients ingredients={PRODUCTS}/>
            <BurgerConstructor ingredients={PRODUCTS}/>
        </div>
      </main>
  );
}

export default Constructor;
