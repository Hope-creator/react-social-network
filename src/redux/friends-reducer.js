import { newUsersAPI } from "../api/api";

const UNFOLLOW_FRIENDS = 'UNFOLLOW_FRIENDS';
const SET_FRIENDS = 'SET_FRIENDS';
const CLEAR_FRIENDS = 'CLEAR_FRIENDS';
const COUNT_FRIENDS = 'COUNT_FRIENDS';
const SET_CURRENT_PAGE_FRIENDS = 'SET_CURRENT_PAGE_FRIENDS';
const TOGGLE_IS_FETCHING_FRIENDS = 'TOGGLE_IS_FETCHING_FRIENDS';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS_FRIENDS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS_FRIENDS';
const SET_SEARCH_FRIENDS_NAME = 'SET_SEARCH_FRIENDS_NAME';
const CLEAR_ALL_FRIENDS_STATE = 'CLEAR_ALL_FRIENDS_STATE';

let initialState = {
    friends: [
    ],
    pageSizeFriends: 30,
    totalFriendsCount: 100,
    currentPageFriends: 1,
    isFetchingFriends: true,
    followingInProgressFriends: [],
    searchFriendsName: ''
}

const friendsReducer = (state = initialState, action) => {

    switch (action.type) {

        case UNFOLLOW_FRIENDS:
            return {
                ...state,
                friends: state.friends.filter(friend => friend._id !== action.userId)
            }

        case CLEAR_FRIENDS:
            return { ...state, friends: [], currentPageFriends: 1 }

        case SET_FRIENDS:
            return { ...state, friends: state.friends.concat(action.friends) }

        case COUNT_FRIENDS:
            return { ...state, totalFriendsCount: action.count }

        case SET_CURRENT_PAGE_FRIENDS:
            return { ...state, currentPageFriends: action.currentPage }

        case SET_SEARCH_FRIENDS_NAME:
            return { ...state, searchFriendsName: action.searchName }

        case TOGGLE_IS_FETCHING_FRIENDS:
            return { ...state, isFetchingFriends: action.isFetching }

        case TOGGLE_IS_FOLLOWING_IN_PROGRESS_FRIENDS:
            return {
                ...state,
                followingInProgress: action.status
                    ? [...state.followingInProgressFriends, action.userId]
                    : state.followingInProgressFriends.filter(id => id !== action.userId)
            }

        case CLEAR_ALL_FRIENDS_STATE:
            return initialState

        default: return state;
    }
}


// actions

export const unfollowSuccess = (userId) => ({
    type: UNFOLLOW_FRIENDS,
    userId
})

export const setFriends = (friends) => ({
    type: SET_FRIENDS,
    friends
})

export const clearAllFriendsState = () => ({
    type: CLEAR_ALL_FRIENDS_STATE
})

export const clearFriends = () => ({
    type: CLEAR_FRIENDS
})

export const setFriendsCount = (count) => ({
    type: COUNT_FRIENDS,
    count
})

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE_FRIENDS,
    currentPage
})

export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING_FRIENDS,
    isFetching
})

export const toggleFollowingProgress = (status, userId) => ({
    type: TOGGLE_IS_FOLLOWING_IN_PROGRESS_FRIENDS,
    status,
    userId
})

export const setSearchFriendsName = (searchName) => ({
    type: SET_SEARCH_FRIENDS_NAME,
    searchName
})

// thunks
export const requestFriends = (currentPage, pageSize, nameFilter, userId) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    try {
        const response = await newUsersAPI.getUsers(currentPage, pageSize, nameFilter, userId)
        if (response && response.data.success) {
            dispatch(setFriends(response.data.items))
            dispatch(setFriendsCount(response.data.totalCount))
        }
        dispatch(toggleIsFetching(false));

    }
    catch (e) {
        console.log(e);
    }
}

export const unfollowThunk = (id) => async (dispatch) => {
    try {
        dispatch(toggleFollowingProgress(true, id));
        let response = await newUsersAPI.unfollow(id);
        if (response.data.success && response.data.unfollowed) dispatch(unfollowSuccess(id))
        dispatch(toggleFollowingProgress(false, id));
    }
    catch (e) {
        console.log(e)
    }
}

export default friendsReducer;