import React from 'react';
import LoaderStyles from './Loader.module.scss';

function Loader() {
  return (
      <div className={LoaderStyles.loader}>
        <div className={LoaderStyles.overlay}></div>
        <div className={LoaderStyles.rings}></div>
      </div>
  );
}

export default Loader;
