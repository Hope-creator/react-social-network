import { usersAPI } from "../api/api";
import { objectInArray } from "../utils/object-helpers/object-helpers";

const UNFOLLOW_FRIENDS = 'UNFOLLOW_FRIENDS';
const SET_FRIENDS = 'SET_FRIENDS';
const CLEAR_FRIENDS = 'CLEAR_FRIENDS';
const COUNT_FRIENDS = 'COUNT_FRIENDS';
const SET_CURRENT_PAGE_FRIENDS = 'SET_CURRENT_PAGE_FRIENDS';
const TOGGLE_IS_FETCHING_FRIENDS = 'TOGGLE_IS_FETCHING_FRIENDS';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS_FRIENDS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS_FRIENDS';
const SET_SEARCH_FRIENDS_NAME = 'SET_SEARCH_FRIENDS_NAME';

let initialState = {
    friends: [
    ],
    pageSizeFriends: 5,
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
                friends: state.friends.filter(friend => friend.id != action.userId)
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
                    : state.followingInProgressFriends.filter(id => id != action.userId)
            }

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
export const requestFriends = (currentPage, pageSize, nameFilter) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    let response = await usersAPI.getUsers(currentPage, pageSize, nameFilter, true)
    dispatch(toggleIsFetching(false));
    dispatch(setFriends(response.data.items))
    dispatch(setFriendsCount(response.data.totalCount))
}

export const followUnfollowFlow = async (dispatch, id, apiMethod, action) => {
    dispatch(toggleFollowingProgress(true, id));
    let response = await apiMethod(id);
    if (response.data.resultCode === 0) dispatch(action);
    dispatch(toggleFollowingProgress(false, id));
}

export const unfollow = (id) => (dispatch) => {
    followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), unfollowSuccess(id))
}

export default friendsReducer;