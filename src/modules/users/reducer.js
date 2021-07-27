import * as actions from "./actions";
import produce from "immer";

const initialState = {
  users: [],
  pageSize: 30,
  totalUsersCount: 100,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
  searchUsersName: "",
};

const reduder = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.FOLLOW: {
        const index = state.users.findIndex(
          (user) => user._id === action.payload.userId
        );
        if (index !== -1) {
          draft.users[index].followers.push(action.payload.ownerId);
        }
        break;
      }

      case actions.UNFOLLOW: {
        const index = state.users.findIndex(
          (user) => user._id === action.payload.userId
        );
        if (index !== -1) {
          const ownerIdIndex = state.users[index].followers.indexOf(
            action.payload.ownerId
          );
          if (ownerIdIndex !== -1) {
            draft.users[index].followers.splice(ownerIdIndex, 1);
          }
        }
        break;
      }

      case actions.CLEAR_USERS: {
        draft.users = [];
        draft.currentPage = 1;
        break;
      }

      case actions.SET_USERS: {
        draft.users = [...state.users, ...action.payload.users];
        break;
      }

      case actions.COUNT_USERS: {
        draft.totalUsersCount = action.payload.count;
        break;
      }

      case actions.SET_CURRENT_PAGE: {
        draft.currentPage = action.payload.currentPage;
        break;
      }

      case actions.SET_SEARCH_USER_NAME: {
        draft.searchUsersName = action.payload.searchName;
        break;
      }

      case actions.TOGGLE_IS_FETCHING: {
        draft.isFetching = action.isFetching;
        break;
      }

      case actions.TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
        draft.followingInProgress = action.payload.status
          ? [...state.followingInProgress, action.payload.userId]
          : state.followingInProgress.filter(
              (id) => id !== action.payload.userId
            );
        break;
      }

      case actions.CLEAR_ALL_USERS_STATE: {
        return initialState;
      }

      default:
        break;
    }
  });

export default reduder;
