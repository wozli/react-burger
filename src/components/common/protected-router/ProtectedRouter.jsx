import {Redirect, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getUser} from "../../../services/slices/auth";


export function ProtectedRoute({children, ...rest}) {
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