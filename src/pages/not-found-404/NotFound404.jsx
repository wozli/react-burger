import React from 'react';
import {Link} from "react-router-dom";
import NotFound404Styles from './NotFound404.module.scss'

function NotFound404() {

  return (
      <div className={NotFound404Styles.notFound}>
        <p className={'text text_type_main-medium'}>Такой страницы не существует!</p>
        <p className={'text text_type_main-medium'}>вернуться на <Link to={'/'}> Главную? </Link></p>
      </div>
  );
}

export default NotFound404;
