import * as actions from "./actions";

const clearAllUsersState = () => ({
  type: actions.CLEAR_ALL_USERS_STATE,
});

const clearUsers = () => ({
  type: actions.CLEAR_USERS,
});

const followSuccess = (userId, ownerId) => ({
  type: actions.FOLLOW,
  payload: {
    userId,
    ownerId,
  },
});

const unfollowSuccess = (userId, ownerId) => ({
  type: actions.UNFOLLOW,
  payload: { userId, ownerId },
});

const setUsers = (users) => ({
  type: actions.SET_USERS,
  payload: { users },
});

const setUsersCount = (count) => ({
  type: actions.COUNT_USERS,
  payload: { count },
});

const setCurrentPage = (currentPage) => ({
  type: actions.SET_CURRENT_PAGE,
  payload: { currentPage },
});

const toggleIsFetching = (isFetching) => ({
  type: actions.TOGGLE_IS_FETCHING,
  payload: { isFetching },
});

const toggleFollowingProgress = (status, userId) => ({
  type: actions.TOGGLE_IS_FOLLOWING_IN_PROGRESS,
  payload: { status, userId },
});

const setSearchUsersName = (searchName) => ({
  type: actions.SET_SEARCH_USER_NAME,
  payload: { searchName },
});

export {
  followSuccess,
  unfollowSuccess,
  setUsers,
  clearAllUsersState,
  clearUsers,
  setUsersCount,
  setCurrentPage,
  toggleIsFetching,
  toggleFollowingProgress,
  setSearchUsersName,
};
