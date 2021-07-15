import * as actions from "./actions";
import produce from "immer";

const initialState = {
  friends: [],
  pageSizeFriends: 30,
  totalFriendsCount: 100,
  currentPageFriends: 1,
  isFetchingFriends: true,
  followingInProgressFriends: [],
  searchFriendsName: "",
};

const reduder = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.UNFOLLOW_FRIENDS: {
        draft.friends = state.friends.filter(
          (friend) => friend._id !== action.payload.userId
        );
        break;
      }

      case actions.CLEAR_FRIENDS: {
        draft.friends = [];
        draft.currentPageFriends = 1;
        break;
      }

      case actions.SET_FRIENDS: {
        draft.friends = [...state.friends, ...action.payload.friends];
        break;
      }

      case actions.COUNT_FRIENDS: {
        draft.totalFriendsCount = action.payload.count;
        break;
      }

      case actions.SET_CURRENT_PAGE_FRIENDS: {
        draft.currentPageFriends = action.payload.currentPage;
        break;
      }

      case actions.SET_SEARCH_FRIENDS_NAME: {
        draft.searchFriendsName = action.payload.searchName;
        break;
      }

      case actions.TOGGLE_IS_FETCHING_FRIENDS: {
        draft.isFetchingFriends = action.payload.isFetching;
        break;
      }

      case actions.TOGGLE_IS_FOLLOWING_IN_PROGRESS_FRIENDS: {
        draft.followingInProgressFriends = action.payload.status
          ? [...state.followingInProgressFriends, action.payload.userId]
          : state.followingInProgressFriends.filter(
              (id) => id !== action.userId
            );
        break;
      }

      case actions.CLEAR_ALL_FRIENDS_STATE: {
        draft = initialState;
        break;
      }

      default:
        break;
    }
  });

export default reduder;
