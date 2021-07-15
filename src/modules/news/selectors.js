const selectNewsPageState = (state) => state.newsPage;

const selectProfileNews = (state) => selectNewsPageState(state).profile;

const selectNewsItems = (state) => selectNewsPageState(state).newsItems;

const selectNewsUsersProfiles = (state) =>
  selectNewsPageState(state).newsProfiles;

const selectCurrentPageNews = (state) => selectNewsPageState(state).currentPage;

const selectPageSizeNews = (state) => selectNewsPageState(state).pageSize;

const selectTotalCountNews = (state) => selectNewsPageState(state).totalCount;

export {
  selectNewsPageState,
  selectProfileNews,
  selectNewsItems,
  selectNewsUsersProfiles,
  selectCurrentPageNews,
  selectPageSizeNews,
  selectTotalCountNews,
};
