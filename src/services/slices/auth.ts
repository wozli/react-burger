import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {postRequest, getRequest, patchRequest} from "../../components/utils/requests";
import {
    USER_REGISTER,
    USER_LOGIN,
    GET_USER,
    USER_REFRESH_TOKEN,
    USER_LOGOUT,
    UPDATE_USER, RESET_PASSWORD, NEW_PASSWORD
} from "../../components/utils/api";
import {TEXT_ERROR_REQUEST} from "../../components/utils/constants";
import {setCookie, getCookie, deleteCookie} from "../../components/utils/cookie";
import {toast} from 'react-toastify';

const saveTokens = (refreshToken: string, accessToken: string) => {
    setCookie('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, {rejectWithValue}) => {
        try {
            const response = await getRequest(GET_USER, {
                headers: {
                    Authorization: 'Bearer ' + getCookie('token')
                }
            });
            return response.data;
        } catch (err: any) {
            if (err.response?.data?.message === 'jwt expired') {
                const {data} = await postRequest(USER_REFRESH_TOKEN, {
                    token: localStorage.getItem('refreshToken')
                });
                if (data?.success) {
                    saveTokens(data.refreshToken, data.accessToken.split('Bearer ')[1]);
                    const response = await getRequest(GET_USER, {
                        headers: {
                            Authorization: 'Bearer ' + getCookie('token')
                        }
                    });
                    return response.data;
                }
            }
            return rejectWithValue(err.message)
        }

    }
);

export const userRegister = createAsyncThunk(
    "auth/userRegister",
    async (register_info: { password: string, email: string, name: string }) => {
        const response =  await postRequest(USER_REGISTER, {
            ...register_info
        });
        return response.data;
    }
);

export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async (login_info: { password: string, email: string }) => {
        const response = await postRequest(USER_LOGIN, {
            ...login_info
        });
        return response.data;
    }
);

export const updateLogin = createAsyncThunk(
    "auth/updateLogin",
    async (new_user_info: object) => {
        const response = await patchRequest(UPDATE_USER, {
            ...new_user_info
        }, {
            headers: {
                Authorization: 'Bearer ' + getCookie('token')
            }
        });
        return response.data;
    }
);

export const userLogout = createAsyncThunk(
    "auth/userLogout",
    async () => {
        const response = await postRequest(USER_LOGOUT, {
            token: localStorage.getItem('refreshToken')
        });
        return response.data;
    }
);

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (email: {email:string }) => {
        const response = await postRequest(RESET_PASSWORD, {
            ...email
        });
        return response.data;
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (info: { password: string, token: string }, {rejectWithValue}) => {
        try {
            const response = await postRequest(NEW_PASSWORD, {
                ...info
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response)
        }
    }
);

export type TUser = {
    email: string,
    name: string,
}

type TInitialState = {
    user: TUser | null,
    authRequest: boolean,
    userRequest: boolean,
    authFailed: boolean,
    accessPageResetPas: boolean,
}

const initialState: TInitialState = {
    user: null,
    authRequest: false,
    userRequest: false,
    authFailed: false,
    accessPageResetPas: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeAccessPageResetPas: (state) => {
            state.accessPageResetPas = !state.accessPageResetPas;
        },
        resetAuth: (state) => {
            state.user = null;
            deleteCookie('token');
            localStorage.removeItem('refreshToken');
        },
        pendingAuth: (state) => {
            state.authRequest = true;
            state.authFailed = false;
        },
        rejectedAuth: (state) => {
            state.authRequest = false;
            state.authFailed = true;
            toast.error(TEXT_ERROR_REQUEST, {
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
        },
        fulfilledAuth: (state) => {
            state.authRequest = false;
            state.authFailed = false;
        },
        setUser: (state, {payload}) => {
            state.user = payload.user;
            if (payload.refreshToken && payload.accessToken) {
                saveTokens(payload.refreshToken, payload.accessToken.split('Bearer ')[1]);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.userRequest = true;
        })
        builder.addCase(getUser.fulfilled, (state, {payload}) => {
            state.user = payload?.user;
            state.userRequest = false;
        })
    },
    // extraReducers: {
    //   [getUser.pending]: (state) => {
    //     state.userRequest = true;
    //   },
    //   [getUser.fulfilled]: (state, {payload}) => {
    //     state.user = payload?.user;
    //     state.userRequest = false;
    //   },
    // },
});

export const {
    resetAuth,
    pendingAuth,
    rejectedAuth,
    fulfilledAuth,
    setUser,
    changeAccessPageResetPas
} = authSlice.actions