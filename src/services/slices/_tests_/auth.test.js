import reducer, {
  resetAuth,
  pendingAuth,
  rejectedAuth,
  fulfilledAuth,
  setUser,
  changeAccessPageResetPas,
  getUser,
  saveTokens,
  userRegister,
  userLogin,
  updateLogin,
  userLogout,
  forgotPassword,
  resetPassword
} from "../auth";
import {store} from "../../../index";
import axios from "axios";
import {getCookie} from "../../../components/utils/cookie";

describe('test order reducers', () => {
  window.alert = jest.fn();

  const mockPost = jest.spyOn(axios, 'post');
  const mockGet = jest.spyOn(axios, 'get');
  const mockPatch = jest.spyOn(axios, 'patch');

  it('Проверка сохранения токенов', async () => {
    saveTokens('refreshToken', 'accessToken');
    expect(getCookie('token')).toEqual('accessToken');
    expect(localStorage.getItem('refreshToken')).toEqual('refreshToken');
  })

  it('Проверка получения пользователя', async () => {
    const userResponse = {
      "success": true,
      "user": {
        "email": "wozli2333@gmail.com",
        "name": "Николай"
      }
    };

    mockGet.mockImplementation(() => Promise.resolve({data: userResponse}));

    const result = await store.dispatch(getUser());
    const payload = result.payload;

    expect(result.type).toBe('auth/getUser/fulfilled');
    const state = store.getState().auth;
    expect(state.user).toEqual(payload.user)
  })

  it('Проверка регистрации пользователя', async () => {
    const registerResponse = {
      success: true,
      refreshToken: 'refreshToken',
      accessToken: 'accessToken',
      user: {
        "email": "wozli2333@gmail.com",
        "name": "Николай"
      }
    };

    mockPost.mockImplementation(() => Promise.resolve({data: registerResponse}));

    const result = await store.dispatch(userRegister({
      password: '12345s',
      email: "wozli2333@gmail.com",
      name: "Николай"
    }));
    const payload = result.payload;

    expect(result.type).toBe('auth/userRegister/fulfilled');
    expect(payload).toEqual(registerResponse);
  })

  it('Проверка логина пользователя', async () => {
    const loginResponse = {
      success: true,
      refreshToken: 'refreshToken',
      accessToken: 'accessToken',
      user: {
        "email": "wozli2333@gmail.com",
        "name": "Николай"
      }
    };

    mockPost.mockImplementation(() => Promise.resolve({data: loginResponse}));

    const result = await store.dispatch(userLogin({password: '12345s', email: "wozli2333@gmail.com"}));
    const payload = result.payload;

    expect(result.type).toBe('auth/userLogin/fulfilled');
    expect(payload).toEqual(loginResponse);
  })

  it('Проверка обновления пользователя', async () => {
    const updateResponse = {
      success: true,
      user: {
        "email": "wozli2333@gmail.com",
        "name": "Николай2"
      }
    };

    mockPatch.mockImplementation(() => Promise.resolve({data: updateResponse}));

    const result = await store.dispatch(updateLogin({email: "wozli2333@gmail.com", name: 'Николай2'}));
    const payload = result.payload;

    expect(result.type).toBe('auth/updateLogin/fulfilled');
    expect(payload).toEqual(updateResponse);
  })

  it('Проверка выхода пользователя', async () => {
    const logoutResponse = {
      success: true,
      message: 'Successful logout'
    };

    mockPost.mockImplementation(() => Promise.resolve({data: logoutResponse}));

    const result = await store.dispatch(userLogout());
    const payload = result.payload;

    expect(result.type).toBe('auth/userLogout/fulfilled');
    expect(payload).toEqual(logoutResponse);
  })

  it('Проверка востановления пароля', async () => {
    const forgotResponse = {
      success: true,
      message: 'Successful forgot'
    };

    mockPost.mockImplementation(() => Promise.resolve({data: forgotResponse}));

    const result = await store.dispatch(forgotPassword({email: 'wozli2333@gmail.com'}));
    const payload = result.payload;

    expect(result.type).toBe('auth/forgotPassword/fulfilled');
    expect(payload).toEqual(forgotResponse);
  })

  it('Проверка изенения пароля', async () => {
    const resetResponse = {
      success: true,
      message: 'Successful reset pas'
    };

    mockPost.mockImplementation(() => Promise.resolve({data: resetResponse}));

    const result = await store.dispatch(resetPassword({password: '12345s', token: 'token'}));
    const payload = result.payload;

    expect(result.type).toBe('auth/resetPassword/fulfilled');
    expect(payload).toEqual(resetResponse);
  })

  const initialState = {
    user: null,
    authRequest: false,
    userRequest: false,
    authFailed: false,
    accessPageResetPas: false,
  };

  it('Проверка редьюсера changeAccessPageResetPas', () => {
    expect(reducer(initialState, changeAccessPageResetPas())).toEqual({
      user: null,
      authRequest: false,
      userRequest: false,
      authFailed: false,
      accessPageResetPas: true,
    });
  })

  it('Проверка редьюсера resetAuth', () => {
    expect(reducer(initialState, resetAuth())).toEqual({
      user: null,
      authRequest: false,
      userRequest: false,
      authFailed: false,
      accessPageResetPas: false,
    });
  })

  it('Проверка редьюсера pendingAuth', () => {
    expect(reducer(initialState, pendingAuth())).toEqual({
      user: null,
      authRequest: true,
      userRequest: false,
      authFailed: false,
      accessPageResetPas: false,
    });
  })

  it('Проверка редьюсера rejectedAuth', () => {
    expect(reducer(initialState, rejectedAuth())).toEqual({
      user: null,
      authRequest: false,
      userRequest: false,
      authFailed: true,
      accessPageResetPas: false,
    });
  })

  it('Проверка редьюсера fulfilledAuth', () => {
    expect(reducer(initialState, fulfilledAuth())).toEqual({
      user: null,
      authRequest: false,
      userRequest: false,
      authFailed: false,
      accessPageResetPas: false,
    });
  })

  it('Проверка редьюсера setUser', () => {
    expect(reducer(initialState, setUser({
      user: {
        email: "wozli2333@gmail.com",
        name: "Николай",
      },
      refreshToken: "refreshToken",
      accessToken: "Bearer accessToken",
    }))).toEqual({
      user: {
        email: "wozli2333@gmail.com",
        name: "Николай",
      },
      authRequest: false,
      userRequest: false,
      authFailed: false,
      accessPageResetPas: false,
    });
    expect(getCookie('token')).toEqual('accessToken');
    expect(localStorage.getItem('refreshToken')).toEqual('refreshToken');
  })
})