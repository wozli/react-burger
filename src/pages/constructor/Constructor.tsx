import React from 'react';
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import ConstructorStyles from './Constructor.module.scss';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useAppSelector} from "../../services/hooks";

function ConstructorPage() {
  const {ingredients} = useAppSelector(state => state.ingredients);

  return (
      <>
        <main className={`${ConstructorStyles.constructor}`}>
          <DndProvider backend={HTML5Backend}>
            <div className={`${ConstructorStyles.constructor__inner} container`}>
              {(ingredients && ingredients.length) && (
                  <>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                  </>
              )}
            </div>
          </DndProvider>
        </main>
      </>
  );
}

export default ConstructorPage;
