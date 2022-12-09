import React, {FormEvent} from 'react';
import { Link } from 'react-router-dom';
import {EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {toast} from "react-toastify";
import {TEXT_ERROR_NOT_FILLED_FIELDS} from "../../components/utils/constants";
import {userLogin, pendingAuth, rejectedAuth, fulfilledAuth, setUser} from "../../services/slices/auth";
import { useHistory } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {useForm} from "../../hooks/useForm";

function LoginPage() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {values, handleChange} = useForm({
      password: '',
      email: '',
  });
  const {userRequest} = useAppSelector(state => state.auth);

  const sendLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.password || !values.email) {
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
    dispatch(userLogin({password: values.password, email: values.email}))
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
      <form className='form' onSubmit={(e) => sendLogin(e)}>
        <h2 className={'text text_type_main-medium mb-6'}>Вход</h2>
        <EmailInput onChange={(e) => handleChange(e)}
                    name={'email'}
                    extraClass='mb-6'
                    value={values.email}/>
        <PasswordInput onChange={(e) => handleChange(e)}
                       name={'password'}
                       extraClass='mb-6'
                       value={values.password}/>
        <Button type="primary"
                htmlType='submit'
                size="medium"
                extraClass='mb-20'>
          Войти
        </Button>
        <div className='form__footer'>
          <p className='text text_type_main-default text_color_inactive'>Вы — новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link></p>
          <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link></p>
        </div>
      </form>
  );
}


export default LoginPage;
