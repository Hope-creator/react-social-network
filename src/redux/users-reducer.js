import { newUsersAPI } from "../api/api";
import { objectInArray } from "../utils/object-helpers/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const CLEAR_USERS = 'CLEAR_USERS';
const COUNT_USERS = 'COUNT-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS';
const SET_SEATCH_USER_NAME = 'SET_SEATCH_USER_NAME';
const CLEAR_ALL_USERS_STATE = 'CLEAR_ALL_USERS_STATE';

let initialState = {
    users: [
    ],
    pageSize: 30,
    totalUsersCount: 100,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    searchUsersName: ''
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: objectInArray(state.users, '_id', action.userId, "followers", action.ownerId, "add")
            }

        case UNFOLLOW:
            return {
                ...state,
                users: objectInArray(state.users, '_id', action.userId, "followers", action.ownerId, "delete")
            }

        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                currentPage: 1
            }

        case SET_USERS:
            return {
                ...state,
                users: state.users.concat(action.users)
            }

        case COUNT_USERS:
            return {
                ...state,
                totalUsersCount: action.count
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }

        case SET_SEATCH_USER_NAME:
            return {
                ...state,
                searchUsersName: action.searchName
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.status
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        case CLEAR_ALL_USERS_STATE:
            return initialState

        default: return state;
    }
}


// actions
export const followSuccess = (userId, ownerId) => ({
    type: FOLLOW,
    userId,
    ownerId
});

export const unfollowSuccess = (userId, ownerId) => ({
    type: UNFOLLOW,
    userId,
    ownerId
})

export const setUsers = (users) => ({
    type: SET_USERS,
    users
})

export const clearAllUsersState = () => ({
    type: CLEAR_ALL_USERS_STATE
})

export const clearUsers = () => ({
    type: CLEAR_USERS
})

export const setUsersCount = (count) => ({
    type: COUNT_USERS,
    count
})

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})

export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

export const toggleFollowingProgress = (status, userId) => ({
    type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    status,
    userId
})

export const setSearchUsersName = (searchName) => ({
    type: SET_SEATCH_USER_NAME,
    searchName
})

// thunks
export const requestUsers = (currentPage, pageSize, nameFilter) => async (dispatch) => {
    try {
        dispatch(toggleIsFetching(true));
        let response = await newUsersAPI.getUsers(currentPage, pageSize, nameFilter)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.data.items))
        dispatch(setUsersCount(response.data.totalCount))
    }
    catch (e) {
        console.log(e)
    }
}



export const followUnfollowThunk = (id, ownerId, method) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, id));
    try {
        const response = method === "follow"
            ? await newUsersAPI.follow(id, ownerId)
            : await newUsersAPI.unfollow(id, ownerId);
        if (response.data.success && response.data.followed) {
            dispatch(followSuccess(id, ownerId))
        }
        if (response.data.success && response.data.unfollowed) {
            dispatch(unfollowSuccess(id, ownerId))
        }
        dispatch(toggleFollowingProgress(false, id));
    }
    catch (e) {
        console.log(e);
    }
}


export default usersReducer;