import {Redirect, Route, useLocation} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getUser} from "../../../services/slices/auth";


export function ProtectedRoute({withAuth = true, children, ...rest}) {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    if (localStorage.getItem('refreshToken')) {
      dispatch(await getUser()).then(() => {
        setUserLoaded(true);
      })
    } else {
      setUserLoaded(true);
    }

  }

  useEffect(() => {
      init();
  }, []);

  if (user && !withAuth) {
    return (
        <Redirect
            to={ state?.from || '/' }
        />
    );
  }

  if (!isUserLoaded) {
    return null;
  }

  return (
      <Route
          {...rest}
          render={({location}) =>
              user ? (
                  children
              ) : (
                  <Redirect
                      to={{
                        pathname: '/login',
                        state: {from: location}
                      }}
                  />
              )
          }
      />
  );
}