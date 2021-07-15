import * as actions from "./actions";

const clearNews = () => ({
  type: actions.CLEARE_NEWS_ITEMS,
});

const clearNewsProfiles = () => ({
  type: actions.CLEARE_NEWS_PROFILES,
});

const setProfile = (profile) => ({
  type: actions.SET_PROFILE,
  payload: { profile },
});

const setNewsProfiles = (newsProfile) => ({
  type: actions.SET_NEWS_PROFILES,
  payload: { newsProfile },
});

const setNews = (newsItems) => ({
  type: actions.SET_NEWS,
  payload: { newsItems },
});

const setNewsCount = (countNews) => ({
  type: actions.COUNT_NEWS,
  payload: { countNews },
});

const setCurrentPageNews = (currentPageNews) => ({
  type: actions.SET_CURRENT_PAGE_NEWS,
  payload: { currentPageNews },
});

export {
  clearNews,
  clearNewsProfiles,
  setProfile,
  setNewsProfiles,
  setNews,
  setNewsCount,
  setCurrentPageNews,
};
