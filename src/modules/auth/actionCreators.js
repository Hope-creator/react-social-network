import { newAuthAPI } from "../../api/api";
import * as actions from "./actions";

const setUser = (id, userRole, userStatus, isAuth) => ({
  type: actions.SET_USER,
  payload: { id, userRole, userStatus, isAuth },
});

const setAuthUserData = (id, login, email, isAuth) => ({
  type: actions.SET_AUTH_USER_DATA,
  payload: {
    id,
    login,
    email,
    isAuth,
  },
});

const authLogin = (isAuth) => ({
  type: actions.AUTH_LOGIN,
  payload: {
    isAuth,
  },
});

const setUnreadConvertastion = (unreadConversations) => ({
  type: actions.SET_UNREAD_CONVERSATIONS,
  payload: {
    unreadConversations,
  },
});

const initUser = () => async (dispatch) => {
  try {
    const response = await newAuthAPI.initUser();
    if (response && response.data.success)
      dispatch(
        setUser(
          response.data.userId,
          response.data.userRole,
          response.data.userStatus,
          true
        )
      );
  } catch (e) {
    console.log(e);
  }
};

const getNewVerificationEmail = () => async (dispatch) => {
  try {
    const response = await newAuthAPI.getNewVerificationEmail();
    if (response && response.data) return response.data;
  } catch (e) {
    console.log(e);
  }
};

const authLoginThunk = (email, password) => async (dispatch) => {
  try {
    const response = await newAuthAPI.authLogin(email, password);
    if (response && response.data.success) {
      dispatch(
        setUser(
          response.data.userId,
          response.data.userRole,
          response.data.userStatus,
          true
        )
      );
      window.location.reload();
    } else {
      return response.data;
    }
  } catch (e) {
    console.log(e);
  }
};

const authLogoutThunk = () => async (dispatch) => {
  try {
    const response = await newAuthAPI.logout();
    if (response && response.data.success) {
      dispatch(setUser(null, null, null, false));
    }
  } catch (e) {
    console.log(e);
  }
};

const resetPasswordGetCode = (email) => async (dispatch) => {
  try {
    const response = await newAuthAPI.resetPasswordGetCode(email);
    if (response && response.data) return response.data;
  } catch (e) {
    console.log(e);
  }
};

const resetPasswordVerifyCode =
  (email, password, password2, code) => async (dispatch) => {
    try {
      const response = await newAuthAPI.resetPasswordVerifyCode(
        email,
        password,
        password2,
        code
      );
      if (response && response.data) return response.data;
    } catch (e) {
      console.log(e);
    }
  };

export {
  setUser,
  setAuthUserData,
  authLogin,
  setUnreadConvertastion,
  initUser,
  getNewVerificationEmail,
  authLoginThunk,
  authLogoutThunk,
  resetPasswordGetCode,
  resetPasswordVerifyCode,
};
