import React, {useEffect, useState} from 'react';
import axios from "axios";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import ConstructorStyles from './Constructor.module.scss';
import {API} from "../../components/utils/constants";

function Constructor() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getProductData = async () => {
      await axios.get(API.GET_INGREDIENTS)
          .then(res => {
            setData(res.data.data)
          })
          .catch(err => console.log(err))
    }

    getProductData();
  }, [])

  return (
      <main className={ConstructorStyles.constructor}>
        <div className={`${ConstructorStyles.constructor__inner} container`}>
          {(data && data.length) &&
              <>
                <BurgerIngredients ingredients={data}/>
                <BurgerConstructor ingredients={data}/>
              </>
          }

        </div>
      </main>
  );
}

export default Constructor;
