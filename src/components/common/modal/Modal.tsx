import React, {useEffect} from 'react';
import * as ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "./components/modal-overlay/ModalOverlay";
import ModalsStyles from './Modal.module.scss';

const modalElement:HTMLElement | null = document.querySelector('#react-modals');

export type TOnClose = () => void;

type TModalProps = {
  children: React.ReactNode,
  onClose: TOnClose
}

function Modal({children, onClose}: TModalProps) {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent):void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [onClose]);

  if (modalElement) {
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

  return null;

}

export default Modal;
