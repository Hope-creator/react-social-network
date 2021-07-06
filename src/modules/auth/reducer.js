import * as actions from "./actions";
import produce from "immer";

let initialState = {
  id: null,
  userRole: null,
  userStatus: null,
  login: null,
  email: null,
  isAuth: false,
  unreadConversations: 0,
};

const reduder = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.AUTH_SET_USER: {
        draft.id = action.payload.id;
        draft.userRole = action.payload.userRole;
        draft.userStatus = action.payload.userStatus;
        draft.isAuth = action.payload.isAuth;
        break;
      }

      case actions.AUTH_SET_USER_DATA: {
        draft.id = action.payload.id;
        draft.login = action.payload.login;
        draft.email = action.payload.email;
        draft.isAuth = action.payload.isAuth;
        break;
      }

      case actions.AUTH_LOGIN: {
        draft.isAuth = action.payload.isAuth;
        break;
      }

      case actions.AUTH_SET_UNREAD_CONVERSATIONS: {
        draft.unreadConversations = action.payload.unreadConversations;
        break;
      }

      default:
        break;
    }
  });

export default reduder;
