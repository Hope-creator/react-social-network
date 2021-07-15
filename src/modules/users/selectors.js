const selectUsersPageState = (state) => state.usersPage;

const selectUsers = (state) => selectUsersPageState(state).users;

const selectPageSizeUsers = (state) => selectUsersPageState(state).pageSize;

const selectTotalCountUsers = (state) => selectUsersPageState(state).totalCount;

const selectCurrentPageUsers = (state) =>
  selectUsersPageState(state).currentPage;

const selectIsFetchingUsers = (state) => selectUsersPageState(state).isFetching;

const selectFollowingInProgress = (state) =>
  selectUsersPageState(state).followingInProgress;

const selectSearchUsersName = (state) =>
  selectUsersPageState(state).searchUsersName;

export {
  selectUsersPageState,
  selectUsers,
  selectPageSizeUsers,
  selectTotalCountUsers,
  selectCurrentPageUsers,
  selectIsFetchingUsers,
  selectFollowingInProgress,
  selectSearchUsersName,
};
