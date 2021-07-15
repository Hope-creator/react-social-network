import { authApi } from "../../api/api";
import {
  setUser,
  setUnreadConvertastion,
  setAuthUserData,
  updateRegUrl,
  clearRegUrl,
} from "./actionCreators";

const setUserRegThunk =
  (name, email, password, password2, acceptance) => async (dispatch) => {
    const response = await authApi.authReg(
      name,
      email,
      password,
      password2,
      acceptance
    );
    if (response.data.success) {
      dispatch(
        setAuthUserData(
          response.data.userId,
          response.data.userRole,
          response.data.userStatus,
          response.data.regUrl,
          false
        )
      );
    }
    return response.data;
  };
const updateUserStatusThunk = () => async (dispatch) => {
  const response = await authApi.updateUserStatus();
  if (!response.data.success) {
    localStorage.clear();
    const logout = await authApi.logout();
    if (logout.data.success) {
      return response.data;
    }
  } else {
    dispatch(
      setUser(
        response.data.userId,
        response.data.userRole,
        response.data.userStatus,
        true
      )
    );
    return response.data;
  }
};

const updateUserRegUrlThunk = () => async (dispatch) => {
  const response = await authApi.getNewVerificationEmail();
  if (response.data.success) {
    dispatch(updateRegUrl(response.data.url));
  } else {
    dispatch(clearRegUrl());
  }
};

const initUser = () => async (dispatch) => {
  try {
    const response = await authApi.initUser();
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

const authLoginThunk = (email, password) => async (dispatch) => {
  try {
    const response = await authApi.authLogin(email, password);
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
    const response = await authApi.logout();
    if (response && response.data.success) {
      dispatch(setUser(null, null, null, false));
    }
  } catch (e) {
    console.log(e);
  }
};

const unreadConversationsSubcribeThunk = (data) => (dispatch) => {
  dispatch(setUnreadConvertastion(data));
};

export {
  setUserRegThunk,
  updateUserStatusThunk,
  initUser,
  authLoginThunk,
  authLogoutThunk,
  unreadConversationsSubcribeThunk,
  updateUserRegUrlThunk,
};
