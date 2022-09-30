import React from 'react';
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import ConstructorStyles from './Constructor.module.scss';
import {PRODUCTS} from "../../components/utils/data";

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
