import React, {useState, useEffect} from 'react';
import BurgerIngredientsStyles from './BurgerIngredients.module.scss';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Title from "../common/title/Title";
import ProductCard from "../productCard/ProductCard";
import * as Scroll from 'react-scroll';
import PropTypes from 'prop-types';
import {PROP_INGREDIENTS} from "../utils/propTypes";

function BurgerIngredients({ingredients}) {
  const [current, setCurrent] = useState('bun');

  const isFilteredIngredients = [
    {
      id: 'bun',
      text: 'Булки',
      items: ingredients.filter(item => item.type === 'bun'),
    },
    {
      id: 'sauce',
      text: 'Соусы',
      items: ingredients.filter(item => item.type === 'sauce'),
    },
    {
      id: 'main',
      text: 'Начинки',
      items: ingredients.filter(item => item.type === 'main'),
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
        <div style={{display: 'flex'}} className='mb-10'>
          <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={`${BurgerIngredientsStyles.list} custom-scroll`} id='scrollContainer'>
          {isFilteredIngredients.map(ingredient => (
              <div className={BurgerIngredientsStyles.category}
                   name={ingredient.id}
                   key={ingredient.id}>
                <Title type='medium'
                       classes='mb-6'
                       text={ingredient.text}/>
                <div className={BurgerIngredientsStyles.grid}>
                  {ingredient.items.map(product => (
                      <ProductCard key={product._id} product={product}/>
                  ))}
                </div>
              </div>
          ))}
        </div>

      </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PROP_INGREDIENTS)
};

export default BurgerIngredients;
