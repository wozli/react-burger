import React, {useState} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {EmailInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {
  fulfilledAuth,
  pendingAuth,
  rejectedAuth,
  changeAccessPageResetPas, forgotPassword
} from "../../services/slices/auth";
import {toast} from "react-toastify";

function ForgotPasswordPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {user, userRequest} = useSelector(state => state.auth);
  const [email, setEmail] = useState('');

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
    dispatch(await forgotPassword({email}))
        .then((res) => {
          dispatch(fulfilledAuth());
          if (res.payload.data.success) {
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
