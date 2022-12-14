import React, {FormEvent, useState} from 'react';
import ProfileFormStyles from './ProfileForm.module.scss'
import {EmailInput, Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {fulfilledAuth, pendingAuth, rejectedAuth, setUser, updateLogin} from "../../services/slices/auth";
import {toast} from "react-toastify";
import {TEXT_ERROR_NOT_FILLED_FIELDS} from "../utils/constants";
import {useAppSelector, useAppDispatch} from "../../services/hooks";
import type {TNewInfo} from "../utils/types";

function ProfileForm() {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  const [password, setPassword] = useState<string>('');
  const [isPasChanged, setIsPasChanged] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(user ? user.email : '');
  const [name, setName] = useState<string>(user ? user.name : '');

  const changePas = (e:React.ChangeEvent<HTMLInputElement>) => {
    setIsPasChanged(true);
    setPassword(e.target.value);
  };

  const onCancel = () => {
    setName(user ? user.name : '');
    setEmail(user ? user.email : '');
    setPassword('');
  }

  const saveUserInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    const newInfo:TNewInfo = {email, name};
    if (password && isPasChanged) {
      newInfo.password = password
    }
    dispatch(pendingAuth());
    dispatch(updateLogin(newInfo))
        .unwrap()
        .then((res) => {
          if (res.success) {
            dispatch(setUser(res));
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
      <form onSubmit={(e) => saveUserInfo(e)}>
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
        {((isPasChanged && password) || (name !== (user ? user.name : '') || email !== (user ? user.email : ''))) && (
            <div className={ProfileFormStyles.profileForm__footer}>
              <Button type="secondary"
                      onClick={() => onCancel()}
                      size="small"
                      htmlType={"button"}>
                Отменить
              </Button>
              <Button type="primary"
                      size="medium"
                      htmlType={"submit"}>
                Сохранить
              </Button>
            </div>
        )}
      </form>
  );
}


export default ProfileForm;
