import React, {useEffect} from 'react';
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import ConstructorStyles from './Constructor.module.scss';
import {getIngredients} from "../../services/slices/ingredients";
import {useSelector, useDispatch} from 'react-redux';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function ConstructorPage() {
  const dispatch = useDispatch();
  const {ingredients} = useSelector(state => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
      <>
        <main className={ConstructorStyles.constructor}>
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
