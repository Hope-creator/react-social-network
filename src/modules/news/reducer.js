import * as actions from "./actions";
import produce from "immer";

const initialState = {
  newsItems: [],
  profile: null,
  newsProfiles: [],
  totalPostCount: 10,
  currentPage: 1,
  pageSize: 50,
};

const reduder = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.SET_NEWS: {
        draft.newsItems = [...state.newsItems, ...action.payload.newsItems];
        break;
      }

      case actions.SET_PROFILE: {
        draft.profile = action.payload.profile;
        break;
      }

      case actions.SET_NEWS_PROFILES: {
        draft.newsProfiles = [
          ...state.newsProfiles,
          action.payload.newsProfile,
        ];
        break;
      }

      case actions.COUNT_NEWS: {
        draft.totalPostCount = action.payload.countNews;
        break;
      }

      case actions.CLEARE_NEWS_ITEMS: {
        draft.newsItems = [];
        break;
      }

      case actions.CLEARE_NEWS_PROFILES: {
        draft.newsProfiles = [];
        break;
      }

      case actions.SET_CURRENT_PAGE_NEWS: {
        draft.currentPage = action.payload.currentPageNews;
        break;
      }

      default:
        break;
    }
  });

export default reduder;
