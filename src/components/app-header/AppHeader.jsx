import React from 'react';
import MenuItem from "../menu-item/MenuItem";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderStyles from './AppHeader.module.scss';

function AppHeader() {
  return (
      <header className={`${HeaderStyles.header} mb-10`}>
        <div className={`${HeaderStyles.header__inner}`}>
          <MenuItem active={true}
                    text='Конструктор'><BurgerIcon type='primary'/> </MenuItem>
          <MenuItem icon='list'
                    classes='ml-2'
                    text='Лента заказов'><ListIcon type='secondary'/></MenuItem>
          <div className={`${HeaderStyles.header__logo}`}><Logo/></div>
          <MenuItem icon='profile'
                    classes='ml-auto'
                    text='Личный кабинет'><ProfileIcon type='secondary'/></MenuItem>
        </div>
      </header>
  );
}

export default AppHeader;
