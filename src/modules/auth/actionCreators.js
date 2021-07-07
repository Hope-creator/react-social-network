import * as actions from "./actions";

const setUser = (id, userRole, userStatus, isAuth) => ({
  type: actions.AUTH_SET_USER,
  payload: { id, userRole, userStatus, isAuth },
});

const setAuthUserData = (id, login, email, isAuth) => ({
  type: actions.AUTH_SET_USER_DATA,
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
  type: actions.AUTH_SET_UNREAD_CONVERSATIONS,
  payload: {
    unreadConversations,
  },
});


export {
  setUser,
  setAuthUserData,
  authLogin,
  setUnreadConvertastion,
};
