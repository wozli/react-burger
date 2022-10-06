import React, {useEffect} from 'react';
import * as ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalsStyles from './Modal.module.scss';
import PropTypes from "prop-types";

const modalElement = document.querySelector('#react-modals');

function Modal({isOpen, children, onClose, title}) {

  const handleKeyDown = e => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen])

  return isOpen && ReactDOM.createPortal(
      <div className={ModalsStyles.modal}>
        <div className={ModalsStyles.modal__overlay} onClick={onClose}></div>
        <div className={ModalsStyles.modal__content}>
          <div className={ModalsStyles.modal__header}>
            {title &&
            <p className={`${ModalsStyles.modal__title} text text_type_main-large`}>{title}</p>
            }
            <div className={ModalsStyles.modal__close}><CloseIcon type='primary' onClick={onClose}/></div>
          </div>

          {children}
        </div>
      </div>,
      modalElement
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string
};

export default Modal;
