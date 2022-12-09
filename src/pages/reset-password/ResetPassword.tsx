import React, {useState} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {
  changeAccessPageResetPas,
  fulfilledAuth,
  pendingAuth, rejectedAuth,
  resetPassword
} from "../../services/slices/auth";
import {toast} from "react-toastify";

function ResetPasswordPage() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {user, accessPageResetPas, userRequest} = useAppSelector(state => state.auth);
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const sendNewPas = () => {
    if (!token || !password) {
      toast.error('Ошибка, возможно введен не правильный код или не корректный пароль!', {
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
    dispatch(resetPassword({password, token}))
        .unwrap()
        .then((res) => {
          dispatch(fulfilledAuth());
          if (res.success) {
            toast.success('Пароль изменен, авторизуйтесь!', {
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
            dispatch(changeAccessPageResetPas());
            history.replace({ pathname: '/login' });
          } else {
            toast.error('Ошибка, проверьте введенные данные!', {
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

  if (!accessPageResetPas && !user) {
    return (
        <Redirect
            to={ '/login' }
        />
    );
  }

  return (
      <div className='form'>
        <h2 className={'text text_type_main-medium mb-6'}>Восстановление пароля</h2>
        <PasswordInput onChange={(e) => setPassword(e.target.value)}
                       name={'password'}
                       placeholder={'Введите новый пароль'}
                       extraClass='mb-6'
                       value={password}/>
        <Input type={'text'}
               placeholder={'Введите код из письма'}
               onChange={e => setToken(e.target.value)}
               value={token}
               extraClass='mb-6'
               name={'token'}
               size={'default'}/>
        <Button type="primary"
                htmlType='button'
                size="medium"
                onClick={() => sendNewPas()}
                extraClass='mb-20'>
          Сохранить
        </Button>
        <div className='form__footer'>
          <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to={'/login'}>Войти</Link></p>
        </div>
      </div>
  );
}


export default ResetPasswordPage;
