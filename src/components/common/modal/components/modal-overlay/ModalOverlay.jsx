import React from 'react';
import ModalOverlayStyles from './ModalOverlay.module.scss';
import PropTypes from "prop-types";

function ModalOverlay({onClick}) {

  return (
      <div className={ModalOverlayStyles.overlay} onClick={onClick}></div>
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
