import React, {useState, useEffect, useMemo} from 'react';
import BurgerIngredientsStyles from './BurgerIngredients.module.scss';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Title from "../common/title/Title";
import Modal from "../common/modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import CategoryItem from "../category-item/CategoryItem";
import * as Scroll from 'react-scroll';
import {TYPE_INGREDIENTS, NAME_INGREDIENTS} from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import { useInView } from 'react-intersection-observer';
import {closeModalIngredient, setCurrentIngredient} from "../../services/slices/ingredients";

function BurgerIngredients() {
  const [tab, setTab] = useState(TYPE_INGREDIENTS.BUN);
  const dispatch = useDispatch();
  const {ingredients, openModalIngredient, currentIngredient } = useSelector(state => state.ingredients);

  const { ref: refBun, inView: inViewByn } = useInView({
    initialInView: true,
  });
  const { ref: refSauce, inView: inViewSauce } = useInView();
  const { ref: refMain, inView: inViewMain } = useInView();

  const ingredientsCategories = useMemo(() => [
    {
      id: TYPE_INGREDIENTS.BUN,
      text: NAME_INGREDIENTS.BUN,
      items: ingredients.filter(item => item.type === TYPE_INGREDIENTS.BUN),
      ref: refBun
    },
    {
      id: TYPE_INGREDIENTS.SAUCE,
      text: NAME_INGREDIENTS.SAUCE,
      items: ingredients.filter(item => item.type === TYPE_INGREDIENTS.SAUCE),
      ref: refSauce
    },
    {
      id: TYPE_INGREDIENTS.MAIN,
      text: NAME_INGREDIENTS.MAIN,
      items: ingredients.filter(item => item.type === TYPE_INGREDIENTS.MAIN),
      ref: refMain
    }
  ], [ingredients, refSauce, refMain, refBun]);

  const handlerOpenModal = (ingredient = {}) => {
    dispatch(setCurrentIngredient(ingredient))
  }

  const handlerCloseModal = () => {
    dispatch(closeModalIngredient())
  }

  useEffect(() => {
    if (inViewByn) {
      setTab(TYPE_INGREDIENTS.BUN);
    } else if (inViewSauce) {
      setTab(TYPE_INGREDIENTS.SAUCE);
    } else if (inViewMain) {
      setTab(TYPE_INGREDIENTS.MAIN);
    }
  }, [inViewMain, inViewSauce, inViewByn]);

  const handlerSetTab = (tab) => {
    setTab(tab);
    Scroll.scroller.scrollTo(tab, {
      duration: 500,
      delay: 100,
      smooth: true,
      containerId: 'scrollContainer',
      offset: 0,
    });
  }

  return (
      <>
        <section className={BurgerIngredientsStyles.section}>
          <Title type='large'
                 classes='mb-5'
                 text='Соберите бургер'/>
          <div className={`${BurgerIngredientsStyles.tabs} mb-10`}>
            <Tab value={TYPE_INGREDIENTS.BUN} active={tab === TYPE_INGREDIENTS.BUN} onClick={handlerSetTab}>
              {NAME_INGREDIENTS.BUN}
            </Tab>
            <Tab value={TYPE_INGREDIENTS.SAUCE} active={tab === TYPE_INGREDIENTS.SAUCE} onClick={handlerSetTab}>
              {NAME_INGREDIENTS.SAUCE}
            </Tab>
            <Tab value={TYPE_INGREDIENTS.MAIN} active={tab === TYPE_INGREDIENTS.MAIN} onClick={handlerSetTab}>
              {NAME_INGREDIENTS.MAIN}
            </Tab>
          </div>
          <div className={`${BurgerIngredientsStyles.list} custom-scroll`} id='scrollContainer'>
            {ingredientsCategories.map(ingredient => (
                <CategoryItem category={ingredient}
                              selectIngredient={handlerOpenModal}
                              key={ingredient.id}/>
            ))}
          </div>

        </section>
        {openModalIngredient && (
            <Modal onClose={handlerCloseModal}
                   title='Детали ингредиента'>
              <IngredientDetails ingredient={currentIngredient}/>
            </Modal>
        )}
      </>
  );
}

export default BurgerIngredients;
