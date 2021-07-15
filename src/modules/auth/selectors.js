const selectAuthState = (state) => state.auth;

const selectIsAuth = (state) => selectAuthState(state).isAuth;

const selectAuthId = (state) => selectAuthState(state).id;

const selectUnreadConversationsCount = (state) =>
  selectAuthState(state).unreadConversations;

const selectRegUrl = (state) => selectAuthState(state).regUrl;

export {
  selectAuthState,
  selectIsAuth,
  selectRegUrl,
  selectAuthId,
  selectUnreadConversationsCount,
};
