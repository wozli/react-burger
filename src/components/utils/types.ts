import React from "react";

export type TIngredient = {
    "_id": string;
    name: string;
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
}

export type TTab = 'bun' | 'sauce' | 'main';

export type TIngredientsCategories = {
    id: string,
    text: string,
    items: TIngredient[],
    ref: React.LegacyRef<HTMLDivElement> | undefined
}