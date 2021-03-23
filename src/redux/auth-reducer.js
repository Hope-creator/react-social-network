import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const AUTH_LOGIN = 'AUTH_LOGIN';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';



let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null // captcha will only show with request
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case AUTH_LOGIN:
            return {
                ...state,
                isAuth: action.isAuth
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }

        default: return state;
    }
}

export const setAuthUserData = (id, login, email, isAuth) => ({
    type: SET_USER_DATA,
    payload: {
        id,
        login,
        email,
        isAuth
    }
});

export const authLogin = (isAuth) => ({
    type: AUTH_LOGIN,
    isAuth
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl
});

export const getAuth = () => async (dispatch) => {

    let response = await authAPI.getAuth()
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data
        dispatch(setAuthUserData(id, login, email, true));
    }
}

export const authLoginThunk = (email, password, captcha) => async (dispatch) => {
    const response = await authAPI.authLogin(email, password, captcha);
    if (response.data.resultCode !== 0) {
        if(response.data.resultCode === 10) dispatch(getCaptchaUrl());
        return response.data.messages
    }
    if (response && response.data.resultCode === 0) {
        dispatch(getAuth());
    }
}

export const authLogoutThunk = () => async (dispatch) => {
    const response = await authAPI.authLogout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    dispatch(getCaptchaUrlSuccess(response.data.url));
}

export default authReducer;