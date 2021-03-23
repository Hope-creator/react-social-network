import { usersAPI } from "../api/api";
import { objectInArray } from "../utils/object-helpers/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const COUNT_USERS = 'COUNT-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [
    ],
    pageSize: 9,
    totalUsersCount: 100,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: objectInArray(state.users,'id',action.userId,{followed: true})
                }

        case UNFOLLOW:
            return {
                ...state,
                users: objectInArray(state.users,'id',action.userId,{followed: false})
            }

        case SET_USERS:
            return { ...state, users: action.users }

        case COUNT_USERS:
            return { ...state, totalUsersCount: action.count }

        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }

        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }

        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.status
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }

        default: return state;
    }
}

export const followSuccess = (userId) => ({
    type: FOLLOW,
    userId
});

export const unfollowSuccess = (userId) => ({
    type: UNFOLLOW,
    userId
})

export const setUsers = (users) => ({
    type: SET_USERS,
    users
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

export const requestUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    let response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.data.items))
    dispatch(setUsersCount(response.data.totalCount))
}

export const followUnfollowFlow = async (dispatch, id, apiMethod, action) => {
    dispatch(toggleFollowingProgress(true, id));
    let response = await apiMethod(id);
    if (response.data.resultCode === 0) dispatch(action);
    dispatch(toggleFollowingProgress(false, id));
}

export const follow = (id) => (dispatch) => {
  followUnfollowFlow(dispatch,id,usersAPI.follow.bind(usersAPI),followSuccess(id))
}

export const unfollow = (id) => (dispatch) => {
 followUnfollowFlow(dispatch,id,usersAPI.unfollow.bind(usersAPI),unfollowSuccess(id))
}

export default usersReducer;