import React from 'react';
import MenuItem from "../menuItem/MenuItem";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderStyles from './AppHeader.module.scss';

function AppHeader() {
  return (
      <header className={`${HeaderStyles.header} mb-10`}>
        <div className={`${HeaderStyles.header__inner}`}>
          <MenuItem active={true}
                    text='Конструктор'/>
          <MenuItem icon='list'
                    classes='ml-2'
                    text='Лента заказов'/>
          <div className={`${HeaderStyles.header__logo}`}><Logo/></div>
          <MenuItem icon='profile'
                    classes='ml-auto'
                    text='Личный кабинет'/>
        </div>
      </header>
  );
}

export default AppHeader;
