import React, {useState} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {EmailInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  fulfilledAuth,
  pendingAuth,
  rejectedAuth,
  changeAccessPageResetPas, forgotPassword
} from "../../services/slices/auth";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../../services/hooks";

function ForgotPasswordPage() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {user, userRequest} = useAppSelector(state => state.auth);
  const [email, setEmail] = useState<string>('');

  const sendResetPassword = async () => {
    if (!email) {
      toast.error('Ошибка, возможно введен не правильный email!', {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }
    dispatch(pendingAuth());
    dispatch(forgotPassword({email}))
        .unwrap()
        .then((res) => {
          dispatch(fulfilledAuth());
          if (res.success) {
            dispatch(changeAccessPageResetPas());
            history.replace({ pathname: '/reset-password' });
          } else {
            toast.error('Ошибка, возможно введен не правильный email!', {
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
          }
        }).catch(err => dispatch(rejectedAuth()));
  }

  if (userRequest) {
    return null
  }

  if (user) {
    return (
        <Redirect
            to={ '/' }
        />
    );
  }

  return (
      <div className='form'>
        <h2 className={'text text_type_main-medium mb-6'}>Восстановление пароля</h2>
        <EmailInput onChange={(e) => setEmail(e.target.value)}
                    name={'email'}
                    placeholder={'Укажите e-mail'}
                    extraClass='mb-6'
                    value={email}/>
        <Button type="primary"
                htmlType='button'
                size="medium"
                onClick={() => sendResetPassword()}
                extraClass='mb-20'>
          Восстановить
        </Button>
        <div className='form__footer'>
          <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to={'/login'}>Войти</Link></p>
        </div>
      </div>
  );
}


export default ForgotPasswordPage;
