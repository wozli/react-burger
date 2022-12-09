import React, {useEffect} from 'react';
import AppHeader from "../app-header/AppHeader";
import {BrowserRouter as Router, Switch, Route, useLocation, useHistory} from 'react-router-dom';
import {
    ConstructorPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    NotFound404,
    FeedPage
} from "../../pages/Index";
import Loader from "../common/loader/loader";
import {ToastContainer} from 'react-toastify';
import AppStyles from './App.module.scss';
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {ProtectedRoute} from "../common/protected-router/ProtectedRouter";
import {getUser} from "../../services/slices/auth";
import Modal from "../common/modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import FeedDetails from "../feed-details/FeedDetails";
import {Location} from "history";
import {getIngredients} from "../../services/slices/ingredients";

type TLocationState = {
    background: Location
}

function App() {
    const dispatch = useAppDispatch();

    const init = async () => {
        if (localStorage.getItem('refreshToken')) {
            dispatch(await getUser())
        }
    }

    useEffect(() => {
        init();
    }, []);

    const ModalSwitch = () => {
        const location = useLocation<TLocationState>();
        const history = useHistory();
        const {orderRequest} = useAppSelector(state => state.order);
        const {ingredientsRequest} = useAppSelector(state => state.ingredients);
        const {authRequest, userRequest} = useAppSelector(state => state.auth);

        const background = location.state && location.state.background;

        const handleModalClose = () => {
            history.goBack();
        };

        useEffect(() => {
            dispatch(getIngredients());
        }, []);

        return (
            <>
                {(ingredientsRequest || orderRequest || authRequest || userRequest) && (
                    <Loader/>
                )}
                <ToastContainer/>
                <AppHeader/>
                <Switch location={background || location}>
                    <Route path="/" exact={true}>
                        <ConstructorPage/>
                    </Route>
                    <ProtectedRoute withAuth={false} path="/login" exact={true}>
                        <LoginPage/>
                    </ProtectedRoute>
                    <ProtectedRoute withAuth={false} path="/register" exact={true}>
                        <RegisterPage/>
                    </ProtectedRoute>
                    <ProtectedRoute withAuth={false} path="/forgot-password" exact={true}>
                        <ForgotPasswordPage/>
                    </ProtectedRoute>
                    <ProtectedRoute withAuth={false} path="/reset-password" exact={true}>
                        <ResetPasswordPage/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile">
                        <ProfilePage/>
                    </ProtectedRoute>
                    <Route path='/ingredients/:ingredientId' exact={true}>
                        <IngredientDetails/>
                    </Route>
                    <Route path='/feed' exact={true}>
                        <FeedPage/>
                    </Route>
                    <Route path='/feed/:id' exact={true}>
                        <FeedDetails/>
                    </Route>
                    <Route>
                        <NotFound404/>
                    </Route>
                </Switch>

                {background && (
                    <>
                        <Route path='/ingredients/:ingredientId'>
                            <Modal onClose={() => handleModalClose()}>
                                <IngredientDetails/>
                            </Modal>
                        </Route>
                        <Route path='/feed/:id'>
                            <Modal onClose={() => handleModalClose()}>
                                <FeedDetails/>
                            </Modal>
                        </Route>
                        <ProtectedRoute path='/profile/orders/:id'>
                            <Modal onClose={() => handleModalClose()}>
                                <FeedDetails/>
                            </Modal>
                        </ProtectedRoute>
                    </>
                )}
            </>
        )
    }

    return (
        <div className={AppStyles.wrapper}>
            <Router>
                <React.StrictMode>
                    <ModalSwitch/>
                </React.StrictMode>
            </Router>
        </div>
    );
}

export default App;
