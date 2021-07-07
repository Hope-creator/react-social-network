import { newAuthAPI } from "../../api/api";
import { setUser, setUnreadConvertastion } from "./actionCreators";

const setUserRegThunk =
  (name, email, password, password2, acceptance) => async (dispatch) => {
    const response = await newAuthAPI.authReg(
      name,
      email,
      password,
      password2,
      acceptance
    );
    if (response.data.success) {
      dispatch(
        setUser(
          response.data.userId,
          response.data.userRole,
          response.data.userStatus,
          false
        )
      );
    }
    return response.data;
  };
const updateUserStatusThunk = () => async (dispatch) => {
  const response = await newAuthAPI.updateUserStatus();
  if (!response.data.success) {
    localStorage.clear();
    const logout = await newAuthAPI.logout();
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

const unreadConversationsSubcribeThunk = (data) => (dispatch) => {
  dispatch(setUnreadConvertastion(data));
};

export {
  setUserRegThunk,
  updateUserStatusThunk,
  initUser,
  getNewVerificationEmail,
  authLoginThunk,
  authLogoutThunk,
  resetPasswordGetCode,
  resetPasswordVerifyCode,
  unreadConversationsSubcribeThunk,
};
