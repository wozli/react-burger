import React from 'react';
import FeedImgStyles from './FeedImg.module.scss';
import {TIngredient} from "../../../utils/types";

function FeedImg({ingredient, addIngredients, index}: {ingredient:TIngredient, addIngredients?:number, index?:number}) {
    return (
        <div className={FeedImgStyles.feedImg}>
            <img src={ingredient.image_mobile} alt={ingredient.name}/>
            {(addIngredients && addIngredients > 0 && index === 5) && (
                <div className={FeedImgStyles.feedImg__count}>+{addIngredients}</div>
            )}
        </div>
    );
}

export default FeedImg;
