import React, {useEffect, useMemo, FC} from 'react';
import IngredientCharacteristic from "./components/ingredient-characteristic/IngredientCharacteristic";
import IngredientDetailsStyles from './IngredientDetails.module.scss';
import {useParams} from "react-router-dom";
import {getIngredients} from "../../services/slices/ingredients";
import {useAppSelector, useAppDispatch} from "../../services/hooks";
import {TIngredient} from "../utils/types";

export const IngredientDetails: FC = () => {
    const dispatch = useAppDispatch();
    const {ingredientId} = useParams<{ ingredientId: string }>();
    const {ingredients} = useAppSelector(state => state.ingredients);

    useEffect(() => {
        if (!ingredients.length) {
            dispatch(getIngredients());
        }
    }, []);

    const ingredient: TIngredient | undefined = useMemo(() => ingredients.find((item: TIngredient) => item._id === ingredientId), [ingredients]);

    if (!ingredient) {
        return <></>;
    }

    return (
        <div className={IngredientDetailsStyles.ingredient}>
            <p className={`text text_type_main-large`}>Детали ингредиента</p>
            <img className={`${IngredientDetailsStyles.ingredient__img} mb-4`}
                 src={ingredient['image_large']}
                 alt={ingredient['name']}/>
            <p className='text text_type_main-medium mb-8'>{ingredient['name']}</p>
            <div className={IngredientDetailsStyles.ingredient__details}>
                <IngredientCharacteristic title='Калории,ккал'
                                          value={ingredient['calories']}/>
                <IngredientCharacteristic title='Белки, г'
                                          value={ingredient['proteins']}/>
                <IngredientCharacteristic title='Жиры, г'
                                          value={ingredient['fat']}/>
                <IngredientCharacteristic title='Углеводы, г'
                                          value={ingredient['carbohydrates']}/>
            </div>
        </div>
    );

}

export default IngredientDetails;
