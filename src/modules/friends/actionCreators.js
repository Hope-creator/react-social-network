import * as actions from "./actions";

const clearAllFriendsState = () => ({
  type: actions.CLEAR_ALL_FRIENDS_STATE,
});

const clearFriends = () => ({
  type: actions.CLEAR_FRIENDS,
});

const unfollowSuccess = (userId) => ({
  type: actions.UNFOLLOW_FRIENDS,
  payload: { userId },
});

const setFriends = (friends) => ({
  type: actions.SET_FRIENDS,
  payload: { friends },
});

const setFriendsCount = (count) => ({
  type: actions.COUNT_FRIENDS,
  payload: { count },
});

const setCurrentPage = (currentPage) => ({
  type: actions.SET_CURRENT_PAGE_FRIENDS,
  payload: { currentPage },
});

const toggleIsFetching = (isFetching) => ({
  type: actions.TOGGLE_IS_FETCHING_FRIENDS,
  payload: { isFetching },
});

const toggleFollowingProgress = (status, userId) => ({
  type: actions.TOGGLE_IS_FOLLOWING_IN_PROGRESS_FRIENDS,
  payload: {
    status,
    userId,
  },
});

const setSearchFriendsName = (searchName) => ({
  type: actions.SET_SEARCH_FRIENDS_NAME,
  payload: { searchName },
});

export {
  unfollowSuccess,
  setFriends,
  clearAllFriendsState,
  clearFriends,
  setFriendsCount,
  setCurrentPage,
  toggleIsFetching,
  toggleFollowingProgress,
  setSearchFriendsName,
};
