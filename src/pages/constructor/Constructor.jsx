import React, {useEffect, useState} from 'react';
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import ConstructorStyles from './Constructor.module.scss';
import {GET_INGREDIENTS} from "../../components/utils/api";
import {getRequest} from "../../components/utils/requests";
import {TEXT_ERROR_REQUEST} from "../../components/utils/constants";

function Constructor() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getRequest(GET_INGREDIENTS)
        .then(res => setData(res.data.data))
        .catch(err => {
          alert(TEXT_ERROR_REQUEST);
          console.log(err);
        });
  }, [])

  return (
      <main className={ConstructorStyles.constructor}>
        <div className={`${ConstructorStyles.constructor__inner} container`}>
          {(data && data.length) && (
              <>
                <BurgerIngredients ingredients={data}/>
                <BurgerConstructor ingredients={data}/>
              </>
          )}
        </div>
      </main>
  );
}

export default Constructor;
