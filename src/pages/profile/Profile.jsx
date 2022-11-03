import React from 'react';
import ProfileStyles from './Profile.module.scss'
import {NavLink} from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {fulfilledAuth, pendingAuth, rejectedAuth, userLogout, resetAuth} from "../../services/slices/auth";
import ProfileForm from "../../components/profile-form/ProfileForm";

function ProfilePage() {
  const dispatch = useDispatch();

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
                <ProfileForm/>
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
