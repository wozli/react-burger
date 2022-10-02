import React from 'react';
import MenuItemStyles from './MenuItem.module.scss';
import classNames from "classnames";
import PropTypes from "prop-types";


function MenuItem({text, classes, children, active}) {
  const textClass = classNames( 'text text_type_main-default ml-2', {
    'text_color_inactive': !active,
  });
  const headerClass = classNames( 'pt-4 pb-4 pr-5 pl-5', {
    [MenuItemStyles.menuItem]: true,
    [classes]: classes,
  });
  return (
      <a href='#' className={headerClass}>
        {children}
        <div className={textClass}>{text}</div>
      </a>
  );
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  classes: PropTypes.string,
  children: PropTypes.node,
  active: PropTypes.bool,
};

export default MenuItem;
