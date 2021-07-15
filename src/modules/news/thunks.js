import { profileApi, newsApi } from "../../api/api";
import {
  setProfile,
  setNewsProfiles,
  setNews,
  setNewsCount,
} from "./actionCreators";

const getProfile = (id) => async (dispatch) => {
  try {
    const response = await profileApi.getProfile(id);
    if (response && response.data.success)
      dispatch(setProfile(response.data.profile));
  } catch (e) {
    console.log(e);
  }
};

const getNewsProfiles = (id) => async (dispatch) => {
  try {
    const response = await profileApi.getProfile(id);
    if (response && response.data.success) {
      dispatch(setNewsProfiles(response.data.profile));
      return "Success";
    } else {
      return "Failed";
    }
  } catch (e) {
    console.log(e);
  }
};

const getNews = (currentPage, pageSize) => async (dispatch) => {
  try {
    const response = await newsApi.getNews(currentPage, pageSize);
    if (response && response.data.success) {
      dispatch(setNews(response.data.newsItems));
      dispatch(setNewsCount(response.data.totalCount));
    }
  } catch (e) {
    console.log(e);
  }
};

export { getProfile, getNewsProfiles, getNews };
