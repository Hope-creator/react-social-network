const selectProfilePageState = (state) => state.profilePage;

const selectProfile = (state) => selectProfilePageState(state).profile;

const selectProfileRandomFriends = (state) =>
  selectProfilePageState(state).randomFriends;

const selectCurrentPageWall = (state) =>
  selectProfilePageState(state).currentPageWall;

const selectCurrentPagePhotos = (state) =>
  selectProfilePageState(state).currentPagePhotos;

const selectPageSizeWall = (state) =>
  selectProfilePageState(state).pageSizeWall;

const selectPageSizePhotos = (state) =>
  selectProfilePageState(state).pageSizePhotos;

const selectTotalWallCount = (state) =>
  selectProfilePageState(state).totalWallCount;

const selectTotalPhotosCount = (state) =>
  selectProfilePageState(state).totalPhotosCount;

const selectWallPosts = (state) => selectProfilePageState(state).wallPosts;

const selectProfilePhotos = (state) =>
  selectProfilePageState(state).profilePhotos;

export {
  selectProfilePageState,
  selectProfile,
  selectProfileRandomFriends,
  selectCurrentPageWall,
  selectCurrentPagePhotos,
  selectPageSizeWall,
  selectPageSizePhotos,
  selectTotalWallCount,
  selectTotalPhotosCount,
  selectWallPosts,
  selectProfilePhotos,
};
