import React, {useEffect} from 'react';
import * as ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "./components/modal-overlay/ModalOverlay";
import ModalsStyles from './Modal.module.scss';
import PropTypes from "prop-types";

const modalElement = document.querySelector('#react-modals');

function Modal({children, onClose}) {

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [onClose]);

  return ReactDOM.createPortal(
      <div className={ModalsStyles.modal}>
        <ModalOverlay onClick={onClose}/>
        <div className={ModalsStyles.modal__content}>
          <div className={ModalsStyles.modal__header}>
            <div className={ModalsStyles.modal__close}><CloseIcon type='primary' onClick={onClose}/></div>
          </div>

          {children}
        </div>
      </div>,
      modalElement
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
