import { newProfileAPI, newNewsAPI } from "../api/api";

const SET_PROFILE = 'SET_PROFILE';
const SET_NEWS_PROFILES = 'SET_NEWS_PROFILES';
const SET_NEWS = 'SET_NEWS';
const SET_CURRENT_PAGE_NEWS = 'SET_CURRENT_PAGE_NEWS';
const COUNT_NEWS = 'COUNT_NEWS';
const CLEARE_NEWS_ITEMS = 'CLEARE_NEWS_ITEMS';
const CLEARE_NEWS_PROFILES = 'CLEARE_NEWS_PROFILES';
const ADD_NEW = 'ADD_NEW';

let initialState = {
    newsItems: [],
    profile: null,
    newsProfiles: [],
    totalPostCount: 10,
    currentPage: 1,
    pageSize: 10,
}

const newsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_NEWS: return {
            ...state,
            newsItems: state.newsItems.concat(action.newsItems)
        }

        case SET_PROFILE: return {
            ...state,
            profile: action.profile
        }

        case SET_NEWS_PROFILES: return {
            ...state,
            newsProfiles: state.newsProfiles.concat(action.newsProfile)
        }

        case COUNT_NEWS: return {
            ...state,
            totalPostCount: action.countNews
        }

        case CLEARE_NEWS_ITEMS: return {
            ...state,
            newsItems: []
        }

        case CLEARE_NEWS_PROFILES: return {
            ...state,
            newsProfiles: []
        }

        case SET_CURRENT_PAGE_NEWS:
            return { ...state, currentPage: action.currentPageNews }

        case ADD_NEW: return {
            ...state,
            newsItems: [...state.newsItems, {
                id: state.newsItems.length + 1,
                userId: action.userId,
                type: action.postType,
                date: action.date,
                text: action.text,
                attachments: action.attachments
            }],
            lastAttachemtId: state.lastAttachemtId - 1
        }

        default: return state;
    }
}


// actions
const setProfile = (profile) => ({
    type: SET_PROFILE,
    profile
});

const setNewsProfiles = (newsProfile) => ({
    type: SET_NEWS_PROFILES,
    newsProfile
});

const setNews = (newsItems) => ({
    type: SET_NEWS,
    newsItems
});

const setNewsCount = (countNews) => ({
    type: COUNT_NEWS,
    countNews
})

export const setCurrentPageNews = (currentPageNews) => ({
    type: SET_CURRENT_PAGE_NEWS,
    currentPageNews
})

export const clearNews = () => ({
    type: CLEARE_NEWS_ITEMS
})

export const clearNewsProfiles = () => ({
    type: CLEARE_NEWS_PROFILES
});




// thunks
export const getProfile = (id) => async (dispatch) => {
    try {
        const response = await newProfileAPI.getProfile(id);
        if (response && response.data.success) dispatch(setProfile(response.data.profile));
    }
    catch (e) {
        console.log(e)
    }
}

export const getNewsProfiles = (id) => async (dispatch) => {
    try {
        const response = await newProfileAPI.getProfile(id);
        if (response && response.data.success) {
            dispatch(setNewsProfiles(response.data.profile));
            return "Success"
        }
        else {
            return "Failed"
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const getNews = (currentPage, pageSize) => async dispatch => {
    try {
        const response = await newNewsAPI.getNews(currentPage, pageSize)
        if (response && response.data.success) {
            dispatch(setNews(response.data.newsItems));
            dispatch(setNewsCount(response.data.totalCount))
        }
    }
    catch (e) {
        console.log(e)
    }
}



export default newsReducer;