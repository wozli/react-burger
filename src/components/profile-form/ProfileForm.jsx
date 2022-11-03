import React, {useState} from 'react';
import ProfileFormStyles from './ProfileForm.module.scss'
import {EmailInput, Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {fulfilledAuth, pendingAuth, rejectedAuth, setUser, updateLogin} from "../../services/slices/auth";
import {toast} from "react-toastify";
import {TEXT_ERROR_NOT_FILLED_FIELDS} from "../utils/constants";

function ProfileForm() {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const [password, setPassword] = useState('');
  const [isPasChanged, setIsPasChanged] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);

  const changePas = (e) => {
    setIsPasChanged(true);
    setPassword(e.target.value);
  };

  const onCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setPassword('');
  }

  const saveUserInfo = async () => {
    if ((!password && isPasChanged) || !email || !name) {
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
    const newInfo = {email, name};
    if (password && isPasChanged) {
      newInfo.password = password
    }
    dispatch(pendingAuth());
    dispatch(await updateLogin(newInfo))
        .then((res) => {
          if (res.payload.data.success) {
            dispatch(setUser(res.payload.data));
            dispatch(fulfilledAuth());
            toast.success('Данные успешно обновлены', {
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
          }
        }).catch(err => dispatch(rejectedAuth()));
  };

  return (
      <>
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
        <PasswordInput onChange={(e) => changePas(e)}
                       name={'password'}
                       extraClass='mb-6'
                       value={password}/>
        {((isPasChanged && password) || (name !== user.name || email !== user.email)) && (
            <div className={ProfileFormStyles.profileForm__footer}>
              <Button type="secondary"
                      onClick={() => onCancel()}
                      size="small"
                      htmlType={"button"}>
                Отменить
              </Button>
              <Button type="primary"
                      onClick={() => saveUserInfo()}
                      size="medium"
                      htmlType={"button"}>
                Сохранить
              </Button>
            </div>
        )}
      </>
  );
}


export default ProfileForm;
