import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {toast} from "react-toastify";
import {TEXT_ERROR_NOT_FILLED_FIELDS} from "../../components/utils/constants";
import {userLogin, pendingAuth, rejectedAuth, fulfilledAuth, setUser} from "../../services/slices/auth";
import { useHistory } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../services/hooks";

function LoginPage() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const {userRequest} = useAppSelector(state => state.auth);

  const sendLogin = () => {
    if (!password || !email) {
      toast.error(TEXT_ERROR_NOT_FILLED_FIELDS, {
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
    dispatch(userLogin({password, email}))
        .unwrap()
        .then((res) => {
          if (res.success) {
            dispatch(setUser(res));
            dispatch(fulfilledAuth());
            history.replace({ pathname: '/' });
          }
        }).catch(err => dispatch(rejectedAuth()));
  };

  if (userRequest) {
    return null
  }

  return (
      <div className='form'>
        <h2 className={'text text_type_main-medium mb-6'}>Вход</h2>
        <EmailInput onChange={(e) => setEmail(e.target.value)}
                    name={'email'}
                    extraClass='mb-6'
                    value={email}/>
        <PasswordInput onChange={(e) => setPassword(e.target.value)}
                       name={'password'}
                       extraClass='mb-6'
                       value={password}/>
        <Button type="primary"
                onClick={() => sendLogin()}
                htmlType='button'
                size="medium"
                extraClass='mb-20'>
          Войти
        </Button>
        <div className='form__footer'>
          <p className='text text_type_main-default text_color_inactive'>Вы — новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link></p>
          <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link></p>
        </div>
      </div>
  );
}


export default LoginPage;
