import { createSelector } from "reselect";

const getFriendsSelector = (state) => state.friendsPage.friends;

export const getFriends = createSelector(getFriendsSelector, friends => friends);

export const getPageSize = (state) => (state.friendsPage.pageSizeFriends);

export const getTotalFriendsCount = (state) => (state.friendsPage.totalFriendsCount);

export const getCurrentPage = (state) => (state.friendsPage.currentPageFriends);

export const getIsFetching = (state) => (state.friendsPage.isFetchingFriends);

export const getFollowingInProgress = (state) => (state.friendsPage.followingInProgressFriends);

export const getSearchFriendsName = (state) => (state.friendsPage.searchFriendsName);