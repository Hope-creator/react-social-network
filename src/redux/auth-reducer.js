import { newAuthAPI } from "../api/api";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const AUTH_LOGIN = 'AUTH_LOGIN';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';
const SET_USER = 'SET_USER';
const SET_UNREAD_CONVERSATIONS = 'SET_UNREAD_CONVERSATIONS';



let initialState = {
    id: null,
    userRole: null,
    userStatus: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null, // captcha will only show with request
    unreadConversations: 0
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER:
            return {
                ...state,
                id: action.id,
                userRole: action.userRole,
                userStatus: action.useStatus,
                isAuth: action.isAuth
            }

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

        case SET_UNREAD_CONVERSATIONS:
            return {
                ...state,
                unreadConversations: action.unreadConversations
            }

        default: return state;
    }
}

export const setUser = (id, userRole, userStatus, isAuth) => ({
    type: SET_USER,
    id,
    userRole,
    userStatus,
    isAuth
})

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

const setUnreadConvertastion = (unreadConversations) => ({
    type: SET_UNREAD_CONVERSATIONS,
    unreadConversations
})

export const initUser = () => async (dispatch) => {
    const response = await newAuthAPI.initUser()
    if (response.data.success) dispatch(setUser(response.data.userId,
        response.data.userRole,
        response.data.userStatus,
        true))
}

export const getNewVerificationEmail = () => async (dispatch) => {
    const response = await newAuthAPI.getNewVerificationEmail()
    return response.data;
}

export const authLoginThunk = (email, password) => async (dispatch) => {
    const response = await newAuthAPI.authLogin(email, password);
    if (response.data.success) {
        dispatch(setUser(response.data.userId,
            response.data.userRole,
            response.data.userStatus,
            true));
            window.location.reload(); 
    }
    else {
        return response.data
    }
}

export const authLogoutThunk = () => async (dispatch) => {
    const response = await newAuthAPI.logout();
    if (response.data.success) {
        dispatch(setUser(null, null, null, false));
    }
}

export const resetPasswordGetCode = (email) => async (dispatch) => {
    const response = await newAuthAPI.resetPasswordGetCode(email);
    return response.data;
}

export const resetPasswordVerifyCode = (email, password, password2, code) => async (dispatch) => {
    const response = await newAuthAPI.resetPasswordVerifyCode(email, password, password2, code);
    return response.data;
}

export const setUserRegThunk = (name, email, password, password2, acceptance) => async (dispatch) => {
    const response = await newAuthAPI.authReg(name, email, password, password2, acceptance);
    if (response.data.success) {
        dispatch(setUser(response.data.userId, response.data.userRole, response.data.userStatus, false));
    }
    return response.data
}

export const updateUserStatusThunk = () => async (dispatch) => {
    const response = await newAuthAPI.updateUserStatus();
    if (!response.data.success) {
        localStorage.clear();
        const logout = await newAuthAPI.logout();
        if(logout.data.success) {
            return response.data
        }
    }
    else {
        dispatch(setUser(response.data.userId, response.data.userRole, response.data.userStatus, true));
        return response.data
    }
}

export const unreadConversationsSubcribeThunk = data => dispatch => {
    dispatch(setUnreadConvertastion(data))
}

export default authReducer;