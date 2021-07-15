import * as actions from "./actions";

const clearWallPosts = () => ({
  type: actions.CLEARE_WALL_POSTS,
});

const clearProfilePhotos = () => ({
  type: actions.CLEARE_PAGE_PHOTOS,
});

const clearProfile = () => ({
  type: actions.CLEARE_PROFILE,
});

const setUserProfile = (profile) => ({
  type: actions.SET_USER_PROFILE,
  payload: { profile },
});

const setStatus = (status) => ({
  type: actions.SET_STATUS,
  payload: { status },
});

const savePhotoSuccess = (profilePicture) => ({
  type: actions.SAVE_PHOTO_SUCCESS,
  payload: { profilePicture },
});

const getRandomFriendSuccess = (randomFriends) => ({
  type: actions.SET_RANDOM_FRIENDS,
  payload: { randomFriends },
});

const setWallPosts = (wallPosts) => ({
  type: actions.SET_WALL_POSTS,
  payload: { wallPosts },
});

const setProfilePhotos = (profilePhotos) => ({
  type: actions.SET_PROFILE_PHOTOS,
  payload: { profilePhotos },
});

const setWallCount = (totalWallCount) => ({
  type: actions.COUNT_WALL_POSTS,
  payload: { totalWallCount },
});

const setPhotoslCount = (totalPhotosCount) => ({
  type: actions.COUNT_PROFILE_PHOTOS,
  payload: { totalPhotosCount },
});

const setNewPost = (post) => ({
  type: actions.SET_NEW_POST,
  payload: { post },
});

const setNewPhotos = (newPhotos) => ({
  type: actions.SET_NEW_PHOTOS,
  payload: { newPhotos },
});

const setWallCurrentPage = (currentPageWall) => ({
  type: actions.SET_CURRENT_PAGE_WALL,
  payload: { currentPageWall },
});

const setPhotosCurrentPage = (currentPagePhotos) => ({
  type: actions.SET_CURRENT_PAGE_PHOTOS,
  payload: { currentPagePhotos },
});

export {
  setUserProfile,
  setStatus,
  savePhotoSuccess,
  getRandomFriendSuccess,
  setWallPosts,
  setProfilePhotos,
  clearProfile,
  setWallCount,
  setPhotoslCount,
  setNewPost,
  setNewPhotos,
  setWallCurrentPage,
  setPhotosCurrentPage,
  clearWallPosts,
  clearProfilePhotos,
};
