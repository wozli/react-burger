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

const saveTokens = (refreshToken, accessToken) => {
  setCookie('token', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, { rejectWithValue }) => {
      try {
        return await getRequest(GET_USER, {
          headers: {
            Authorization: 'Bearer ' + getCookie('token')
          }
        });
      } catch (err) {
        if (err.response?.data?.message === 'jwt expired') {
          const {data} = await postRequest(USER_REFRESH_TOKEN, {
            token: localStorage.getItem('refreshToken')
          });
          if (data?.success) {
            saveTokens(data.refreshToken, data.accessToken.split('Bearer ')[1]);
            return await getRequest(GET_USER, {
              headers: {
                Authorization: 'Bearer ' + getCookie('token')
              }
            });
          }
        }
        return rejectWithValue(err.message)
      }

    }
);

export const userRegister = createAsyncThunk(
    "auth/userRegister",
    async (register_info) => {
      return await postRequest(USER_REGISTER, {
        ...register_info
      });
    }
);

export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async (login_info) => {
      return await postRequest(USER_LOGIN, {
        ...login_info
      });
    }
);

export const updateLogin = createAsyncThunk(
    "auth/updateLogin",
    async (new_user_info) => {
      return await patchRequest(UPDATE_USER, {
        ...new_user_info
      }, {
        headers: {
          Authorization: 'Bearer ' + getCookie('token')
        }
      });
    }
);

export const userLogout = createAsyncThunk(
    "auth/userLogout",
    async () => {
      return await postRequest(USER_LOGOUT, {
        token: localStorage.getItem('refreshToken')
      });
    }
);

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (email) => {
      return await postRequest(RESET_PASSWORD, {
        ...email
      });
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (info, { rejectWithValue}) => {
      try {
        return await postRequest(NEW_PASSWORD, {
          ...info
        });
      } catch (err) {
        return rejectWithValue(err.response)
      }
    }
);

const initialState = {
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
  extraReducers: {
    [getUser.pending]: (state, {payload}) => {
      state.userRequest = true;
    },
    [getUser.fulfilled]: (state, {payload}) => {
      state.user = payload.data?.user;
      state.userRequest = false;
    },
  },
});

export const {resetAuth, pendingAuth, rejectedAuth, fulfilledAuth, setUser, changeAccessPageResetPas} = authSlice.actions