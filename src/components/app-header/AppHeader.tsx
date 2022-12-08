import React from 'react';
import MenuItem from "../menu-item/MenuItem";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderStyles from './AppHeader.module.scss';
import {useLocation} from "react-router-dom";

function AppHeader() {
  const location = useLocation();

  return (
      <header className={`${HeaderStyles.header} mb-10`}>
        <div className={`${HeaderStyles.header__inner}`}>
          <MenuItem to={'/'}
                    exact={true}
                    text='Конструктор'><BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'}/> </MenuItem>
          <MenuItem exact={true}
                    to={'/feed'}
                    classes='ml-2'
                    text='Лента заказов'><ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'}/></MenuItem>
          <div className={`${HeaderStyles.header__logo}`}><Logo/></div>
          <MenuItem exact={false}
                    to={'/profile'}
                    classes='ml-auto'
                    text='Личный кабинет'><ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'}/></MenuItem>
        </div>
      </header>
  );
}

export default AppHeader;
