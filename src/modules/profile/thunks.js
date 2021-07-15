import { profileApi, usersApi, newsApi } from "../../api/api";
import {
  setUserProfile,
  setStatus,
  setWallPosts,
  setWallCount,
  setProfilePhotos,
  setPhotoslCount,
  savePhotoSuccess,
  getRandomFriendSuccess,
  setNewPost,
  setNewPhotos,
} from "./actionCreators";

const getProfile = (id) => async (dispatch) => {
  try {
    let response = await profileApi.getProfile(id);
    if (response && response.data.success) {
      dispatch(setUserProfile(response.data.profile));
      dispatch(setStatus(response.data.profile.profile.status));
    } else {
      return response.data.Error || response.data.errors;
    }
  } catch (e) {
    console.log(e);
  }
};

const getPosts = (currentPage, pageSize, id) => async (dispatch) => {
  try {
    let response = await profileApi.getPosts(id, currentPage, pageSize);
    if (response && response.data.success) {
      dispatch(setWallPosts(response.data.posts));
      dispatch(setWallCount(response.data.postsCount));
    }
  } catch (e) {
    console.log(e);
  }
};

const getPhotos = (currentPage, pageSize, id) => async (dispatch) => {
  try {
    let response = await profileApi.getPhotos(id, currentPage, pageSize);
    if (response && response.data.success) {
      dispatch(setProfilePhotos(response.data.profilePhotos));
      dispatch(setPhotoslCount(response.data.photosCount));
    }
  } catch (e) {
    console.log(e);
  }
};

const updateStatus = (newStatus) => async (dispatch) => {
  try {
    let response = await profileApi.updateStatus(newStatus);
    if (response && response.data.success) {
      dispatch(setStatus(response.data.user.profile.status));
    }
  } catch (e) {
    console.log(e);
  }
};

const savePhoto = (file) => async (dispatch) => {
  try {
    let formData = new FormData();
    formData.append("profilePicture", file);
    let response = await profileApi.updatePhoto(formData);
    if (response && response.data.success) {
      dispatch(savePhotoSuccess(response.data.user.profile.profilePicture));
    }
  } catch (e) {
    console.log(e);
  }
};

const updateProfile = (profile) => async (dispatch) => {
  try {
    let response = await profileApi.updateProfile(profile);
    if (response && response.data.success) {
      dispatch(setUserProfile(response.data.user));
      return "success";
    } else {
      return response.data.errors;
    }
  } catch (e) {
    console.log(e);
  }
};

const getFriends = (id) => async (dispatch) => {
  try {
    let response = await usersApi.getFriends(id, true);
    if (response && response.data.success)
      dispatch(getRandomFriendSuccess(response.data.randomFriends));
  } catch (e) {
    console.log(e);
  }
};

const addNewPostThunk = (data) => async (dispatch) => {
  try {
    const response = await newsApi.addNewPost(data);
    if (response && response.data.success)
      dispatch(setNewPost(response.data.post));
  } catch (e) {
    console.log(e);
  }
};

const addNewPhotosThunk = (data) => async (dispatch) => {
  try {
    const response = await profileApi.addNewPhotos(data);
    if (response && response.data.success)
      dispatch(setNewPhotos(response.data.savedPhotos));
  } catch (e) {
    console.log(e);
  }
};

export {
  getProfile,
  getPosts,
  getPhotos,
  updateStatus,
  savePhoto,
  updateProfile,
  getFriends,
  addNewPostThunk,
  addNewPhotosThunk,
};
