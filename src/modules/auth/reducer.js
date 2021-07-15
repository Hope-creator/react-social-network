import * as actions from "./actions";
import produce from "immer";

const initialState = {
  id: null,
  userRole: null,
  userStatus: null,
  login: null,
  email: null,
  isAuth: false,
  regUrl: null,
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
        draft.userRole = action.payload.role;
        draft.email = action.payload.email;
        draft.regUrl = action.payload.regUrl;
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

      case actions.AUTH_CLEAR_REG_URL: {
        draft.regUrl = null;
        break;
      }

      case actions.AUTH_UPDATE_REG_URL: {
        draft.regUrl = action.payload.newUrl;
        break;
      }

      default:
        break;
    }
  });

export default reduder;
