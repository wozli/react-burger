import React, {useState} from 'react';
import ProfileStyles from './Profile.module.scss'
import {NavLink} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';
import {EmailInput, Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {fulfilledAuth, pendingAuth, rejectedAuth, setUser, updateLogin, userLogout, resetAuth} from "../../services/slices/auth";
import {toast} from "react-toastify";
import {TEXT_ERROR_NOT_FILLED_FIELDS} from "../../components/utils/constants";

function ProfilePage() {
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
    dispatch(await updateLogin({password, email, name}))
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

  const logout = async () => {
    let isLogout = window.confirm("Действительно хотите выйти из аккаунта?");
    if (!isLogout) {
      return;
    }

    dispatch(pendingAuth());
    dispatch(await userLogout())
        .then((res) => {
          if (res.payload.data.success) {
           dispatch(resetAuth());
           dispatch(fulfilledAuth());
          }
        }).catch(err => dispatch(rejectedAuth()));
  }

  return (
      <main className={ProfileStyles.profile}>
        <div className={`${ProfileStyles.profile__inner} container`}>
          <section className={`${ProfileStyles.profile__menu} mr-15`}>
            <ul className={`${ProfileStyles.profile__ul}`}>
              <li>
                <NavLink to={'/profile'}
                         className={`${ProfileStyles.profile__link} text text_type_main-medium text_color_inactive`}
                         activeClassName={ProfileStyles.profile__linkActive}
                         exact={true}>Профиль</NavLink>
              </li>
              <li>
                <NavLink to={'/profile/orders'}
                         className={`${ProfileStyles.profile__link} text text_type_main-medium text_color_inactive`}
                         activeClassName={ProfileStyles.profile__linkActive}
                         exact={true}>История заказов</NavLink>
              </li>
              <li>
                <button type={'button'}
                        onClick={() => logout()}
                        className={`${ProfileStyles.profile__link} text text_type_main-medium text_color_inactive`}>
                  Выход
                </button>
              </li>
            </ul>
            <div className={`${ProfileStyles.profile__desc} mt-20`}>
              <Switch>
                <Route path="/profile" exact={true}>
                  В этом разделе вы можете
                  изменить свои персональные данные
                </Route>
                <Route path="/profile/orders" exact={true}>
                  В этом разделе вы можете
                  посмотреть свою историю заказов
                </Route>
              </Switch>
            </div>

          </section>
          <section className={ProfileStyles.profile__body}>
            <Switch>
              <Route path="/profile" exact={true}>
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
                {((isPasChanged && password) && (name !== user.name || email !== user.email)) && (
                    <div className={ProfileStyles.profile__flexEnd}>
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
              </Route>
              <Route path="/profile/orders" exact={true}>
                История заказов
              </Route>
            </Switch>
          </section>
        </div>
      </main>
  );
}


export default ProfilePage;
