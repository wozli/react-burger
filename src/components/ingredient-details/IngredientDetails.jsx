import React, {useEffect, useMemo} from 'react';
import IngredientCharacteristic from "./components/ingredient-characteristic/IngredientCharacteristic";
import IngredientDetailsStyles from './IngredientDetails.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getIngredients} from "../../services/slices/ingredients";

function IngredientDetails() {
  const dispatch = useDispatch();
  const {ingredientId} = useParams();
  const {ingredients} = useSelector(state => state.ingredients);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, []);

  const ingredient = useMemo(() => ingredients.find(item => item._id === ingredientId), [ingredients]);

  if (!ingredient) {
    return;
  }

  return (
      <div className={IngredientDetailsStyles.ingredient}>
        <p className={`text text_type_main-large`}>Детали ингредиента</p>
        <img className={`${IngredientDetailsStyles.ingredient__img} mb-4`}
             src={ingredient.image_large}
             alt={ingredient.name}/>
        <p className='text text_type_main-medium mb-8'>{ingredient.name}</p>
        <div className={IngredientDetailsStyles.ingredient__details}>
          <IngredientCharacteristic title='Калории,ккал'
                                    value={ingredient.calories}/>
          <IngredientCharacteristic title='Белки, г'
                                    value={ingredient.proteins}/>
          <IngredientCharacteristic title='Жиры, г'
                                    value={ingredient.fat}/>
          <IngredientCharacteristic title='Углеводы, г'
                                    value={ingredient.carbohydrates}/>
        </div>
      </div>
  );
}

export default IngredientDetails;
