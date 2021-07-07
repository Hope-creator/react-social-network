const selectAuthState = (state) => state.auth;

const selectIsAuth = (state) => selectAuthState(state).isAuth;

export { selectAuthState, selectIsAuth };
