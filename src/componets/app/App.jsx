import React from 'react';
import AppHeader from "../appHeader/AppHeader";
import Constructor from "../../pages/constructor/Constructor";

import AppStyles from './App.module.scss';

function App() {
  return (
    <div className={AppStyles.wrapper}>
      <AppHeader/>
      <Constructor/>
    </div>
  );
}

export default App;
