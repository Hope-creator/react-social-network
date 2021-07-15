const selectFriendsPageState = (state) => state.friendsPage;

const selectFriends = (state) => selectFriendsPageState(state).friends;

const selectPageSizeFriends = (state) =>
  selectFriendsPageState(state).pageSizeFriends;

const selectTotalFriendsCount = (state) =>
  selectFriendsPageState(state).totalFriendsCount;

const selectCurrentFriendsPage = (state) =>
  selectFriendsPageState(state).currentPageFriends;

const selectIsFetchingFriends = (state) =>
  selectFriendsPageState(state).isFetchingFriends;

const selectFollowingInProgressFriends = (state) =>
  selectFriendsPageState(state).followingInProgressFriends;

const selectSearchFriendsName = (state) =>
  selectFriendsPageState(state).searchFriendsName;

export {
  selectFriendsPageState,
  selectFriends,
  selectPageSizeFriends,
  selectTotalFriendsCount,
  selectCurrentFriendsPage,
  selectIsFetchingFriends,
  selectFollowingInProgressFriends,
  selectSearchFriendsName,
};
