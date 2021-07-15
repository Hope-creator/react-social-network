import * as actions from "./actions";

const setUser = (id, userRole, userStatus, isAuth) => ({
  type: actions.AUTH_SET_USER,
  payload: { id, userRole, userStatus, isAuth },
});

const setAuthUserData = (id, role, email, regUrl, isAuth) => ({
  type: actions.AUTH_SET_USER_DATA,
  payload: {
    id,
    role,
    email,
    regUrl,
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
  type: actions.AUTH_SET_UNREAD_CONVERSATIONS,
  payload: {
    unreadConversations,
  },
});

const updateRegUrl = (newUrl) => ({
  type: actions.AUTH_UPDATE_REG_URL,
  payload: {
    newUrl
  }
});

const clearRegUrl = () => ({
  type: actions.AUTH_CLEAR_REG_URL,
});

export {
  setUser,
  setAuthUserData,
  authLogin,
  setUnreadConvertastion,
  updateRegUrl,
  clearRegUrl,
};
