import React from 'react';
import ModalOverlayStyles from './ModalOverlay.module.scss';
import {TOnClose} from "../../Modal";

function ModalOverlay({onClick}: {onClick: TOnClose}) {

  return (
      <div className={ModalOverlayStyles.overlay} onClick={onClick}></div>
  );
}

export default ModalOverlay;
