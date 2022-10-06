import React from 'react';
import IngredientCharacteristic from "./components/ingredient-characteristic/IngredientCharacteristic";
import IngredientDetailsStyles from './IngredientDetails.module.scss';
import {PROP_INGREDIENTS} from "../utils/propTypes";

function IngredientDetails({ingredient}) {

  return (
      <div className={IngredientDetailsStyles.ingredient}>
          <p className={`${IngredientDetailsStyles.ingredient__title} text text_type_main-large`}>
            Детали ингредиента
          </p>
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

IngredientDetails.propTypes = {
  ingredient: PROP_INGREDIENTS
};

export default IngredientDetails;
