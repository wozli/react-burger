import React, {useState} from 'react';
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {EmailInput, PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from 'react-redux';
import {userRegister, pendingAuth, rejectedAuth, fulfilledAuth, setUser} from "../../services/slices/auth";
import { toast } from 'react-toastify';
import {TEXT_ERROR_NOT_FILLED_FIELDS} from "../../components/utils/constants";

function RegisterPage() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const {user, userRequest} = useSelector(state => state.auth);

  const sendRegister = async () => {
    if (!password || !email || !name) {
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
    dispatch(userRegister({password, email, name}))
        .then((res) => {
          if (res.payload.data.success) {
            dispatch(setUser(res.payload.data));
            dispatch(fulfilledAuth());
            history.replace({ pathname: '/' });
          }
        }).catch(err => dispatch(rejectedAuth()));
  }
  if (userRequest) {
    return null
  }
  if (user) {
    return (
        <Redirect
            to={ state?.from || '/' }
        />
    );
  }

  return (
      <div className='form'>
        <h2 className={'text text_type_main-medium mb-6'}>Регистрация</h2>
        <Input type={'text'}
               placeholder={'Имя'}
               onChange={e => setName(e.target.value)}
               value={name}
               extraClass='mb-6'
               name={'name'}
               size={'default'}/>
        <EmailInput onChange={(e) => setEmail(e.target.value)}
                    name={'email'}
                    extraClass='mb-6'
                    value={email}/>
        <PasswordInput onChange={(e) => setPassword(e.target.value)}
                       name={'password'}
                       extraClass='mb-6'
                       value={password}/>
        <Button type="primary"
                htmlType='button'
                size="medium"
                onClick={() => sendRegister()}
                extraClass='mb-20'>
          Зарегистрироваться
        </Button>
        <div className='form__footer'>
          <p className='text text_type_main-default text_color_inactive'>Уже зарегистрированы? <Link to={'/login'}>Войти</Link></p>
        </div>
      </div>
  );
}


export default RegisterPage;
