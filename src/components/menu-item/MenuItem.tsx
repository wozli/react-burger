import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuItemStyles from './MenuItem.module.scss';
import classNames from "classnames";

type TMenuItemProps = {
  text: string,
  classes?: string,
  children: React.ReactNode,
  exact: boolean,
  to: string,
}

function MenuItem({text, classes = '', children, to, exact}: TMenuItemProps) {
  const headerClass = classNames( 'pt-4 pb-4 pr-5 pl-5', {
    [MenuItemStyles.menuItem]: true,
    [classes]: classes,
  });

  return (
      <NavLink to={to}
               exact={exact}
               className={headerClass}
               activeClassName={MenuItemStyles.menuItem__isActive}>
        {children}
        <div className={`${MenuItemStyles.menuItem__text} text text_type_main-default ml-2`}>{text}</div>
      </NavLink>
  );
}

export default MenuItem;
