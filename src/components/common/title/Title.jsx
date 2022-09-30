import React from 'react';
import classNames from "classnames";

function Title(props) {
  const titleClass = classNames( 'text', {
    'text_type_main-large': props.type === 'large',
    'text_type_main-medium': props.type === 'medium',
    [props.classes]: props.classes
  });
  return (
      <p className={titleClass}>
        {props.text}
      </p>
  );
}

export default Title;
