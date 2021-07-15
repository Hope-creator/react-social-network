import * as actions from "./actions";
import produce from "immer";

const initialState = {
  wallPosts: [],
  profilePhotos: [],
  profile: null,
  randomFriends: null,
  totalWallCount: null,
  totalPhotosCount: null,
  currentPageWall: 1,
  currentPagePhotos: 1,
  pageSizeWall: 30,
  pageSizePhotos: 50,
};

const reduder = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.SET_USER_PROFILE: {
        draft.profile = action.payload.profile;
        break;
      }

      case actions.SET_STATUS: {
        draft.profile.profile.status = action.payload.status;
        break;
      }

      case actions.SAVE_PHOTO_SUCCESS: {
        draft.profile.profile.profilePicture = action.payload.profilePicture;
        break;
      }

      case actions.SET_WALL_POSTS: {
        draft.wallPosts = [...state.wallPosts, ...action.payload.wallPosts];
        break;
      }

      case actions.SET_PROFILE_PHOTOS: {
        draft.profilePhotos = [
          ...state.profilePhotos,
          ...action.payload.profilePhotos,
        ];
        break;
      }

      case actions.COUNT_WALL_POSTS: {
        draft.totalWallCount = action.payload.totalWallCount;
        break;
      }

      case actions.COUNT_PROFILE_PHOTOS: {
        draft.totalPhotosCount = action.payload.totalPhotosCount;
        break;
      }

      case actions.SET_CURRENT_PAGE_WALL: {
        draft.currentPageWall = action.payload.currentPageWall;
        break;
      }

      case actions.SET_CURRENT_PAGE_PHOTOS: {
        draft.currentPagePhotos = action.payload.currentPagePhotos;
        break;
      }

      case actions.CLEARE_WALL_POSTS: {
        draft.wallPosts = [];
        break;
      }

      case actions.CLEARE_PAGE_PHOTOS: {
        draft.profilePhotos = [];
        break;
      }

      case actions.CLEARE_PROFILE: {
        draft.profile = null;
        break;
      }

      case actions.SET_RANDOM_FRIENDS: {
        draft.randomFriends = action.payload.randomFriends;
        break;
      }

      case actions.SET_NEW_POST: {
        draft.wallPosts = [action.payload.post, ...state.wallPosts];
        break;
      }

      case actions.SET_NEW_PHOTOS: {
        draft.profilePhotos = [
          ...action.payload.newPhotos,
          ...state.profilePhotos,
        ];
        break;
      }

      default:
        break;
    }
  });

export default reduder;
