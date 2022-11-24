import {Redirect, Route, useLocation} from 'react-router-dom';
import React, {useEffect, useState, FC} from 'react';
import {getUser} from "../../../services/slices/auth";
import {useAppDispatch, useAppSelector} from "../../../services/hooks";

type TProtectedRouteProps = {
    withAuth?: boolean,
    children: React.ReactNode,
    path: string,
    exact?: boolean
}

export const ProtectedRoute: FC<TProtectedRouteProps> = ({withAuth = true, children, ...rest}) => {
    const {state} = useLocation<{from:string}>();
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth);
    const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

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
                to={state?.from || '/'}
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
                user || !withAuth ? (
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