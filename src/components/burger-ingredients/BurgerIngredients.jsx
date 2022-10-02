import React, {useState, useEffect} from 'react';
import BurgerIngredientsStyles from './BurgerIngredients.module.scss';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Title from "../common/title/Title";
import CategoryItem from "../category-item/CategoryItem";
import * as Scroll from 'react-scroll';
import PropTypes from 'prop-types';
import {PROP_INGREDIENTS} from "../utils/propTypes";
import {TYPE_INGREDIENTS, NAME_INGREDIENTS} from "../utils/constants";

function BurgerIngredients({ingredients}) {
  const [current, setCurrent] = useState(TYPE_INGREDIENTS.BUN);

  const isFilteredIngredients = [
    {
      id: TYPE_INGREDIENTS.BUN,
      text: NAME_INGREDIENTS.BUN,
      items: ingredients.filter(item => item.type === TYPE_INGREDIENTS.BUN),
    },
    {
      id: TYPE_INGREDIENTS.SAUCE,
      text: NAME_INGREDIENTS.SAUCE,
      items: ingredients.filter(item => item.type === TYPE_INGREDIENTS.SAUCE),
    },
    {
      id: TYPE_INGREDIENTS.MAIN,
      text: NAME_INGREDIENTS.MAIN,
      items: ingredients.filter(item => item.type === TYPE_INGREDIENTS.MAIN),
    }
  ];
  useEffect(() => {
    Scroll.scroller.scrollTo(current, {
      duration: 500,
      delay: 100,
      smooth: true,
      containerId: 'scrollContainer',
      offset: 0,
    })
  }, [current]);
  return (
      <section className={BurgerIngredientsStyles.section}>
        <Title type='large'
               classes='mb-5'
               text='Соберите бургер'/>
        <div className={`${BurgerIngredientsStyles.tabs} mb-10`}>
          <Tab value={TYPE_INGREDIENTS.BUN} active={current === TYPE_INGREDIENTS.BUN} onClick={setCurrent}>
            {NAME_INGREDIENTS.BUN}
          </Tab>
          <Tab value={TYPE_INGREDIENTS.SAUCE} active={current === TYPE_INGREDIENTS.SAUCE} onClick={setCurrent}>
            {NAME_INGREDIENTS.SAUCE}
          </Tab>
          <Tab value={TYPE_INGREDIENTS.MAIN} active={current === TYPE_INGREDIENTS.MAIN} onClick={setCurrent}>
            {NAME_INGREDIENTS.MAIN}
          </Tab>
        </div>
        <div className={`${BurgerIngredientsStyles.list} custom-scroll`} id='scrollContainer'>
          {isFilteredIngredients.map(ingredient => (
              <CategoryItem category={ingredient}
                            key={ingredient.id}/>
          ))}
        </div>

      </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PROP_INGREDIENTS.isRequired).isRequired
};

export default BurgerIngredients;
