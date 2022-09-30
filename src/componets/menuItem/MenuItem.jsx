import React from 'react';
import MenuItemStyles from './MenuItem.module.scss';
import classNames from "classnames";
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function MenuItem(props) {
  const textClass = classNames( 'text text_type_main-default ml-2', {
    'text_color_inactive': !props.active,
  });
  const headerClass = classNames( 'pt-4 pb-4 pr-5 pl-5', {
    [MenuItemStyles.menuItem]: true,
    [props.classes]: props.classes,
  });
  const Icon = () => {
    const type = props.active ? 'primary' : 'secondary';
    switch (props.icon) {
      default:
      case 'burger': {
        return (<BurgerIcon type={type}/>)
      }
      case 'list': {
        return (<ListIcon type={type}/>)
      }
      case 'profile': {
        return (<ProfileIcon type={type}/>)
      }
    }
  }
  return (
      <div className={headerClass}>
        <Icon/>
        <div className={textClass}>{props.text}</div>
      </div>
  );
}

export default MenuItem;
