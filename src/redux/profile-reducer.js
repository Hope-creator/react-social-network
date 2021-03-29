import { newNewsAPI, newProfileAPI, newUsersAPI} from "../api/api";

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const SET_RANDOM_FRIENDS = 'SET_RANDOM_FRIENDS';
const SET_WALL_POSTS = 'SET_WALL_POSTS';
const COUNT_WALL_POSTS = 'COUNT_WALL_POSTS';
const SET_CURRENT_PAGE_WALL = 'SET_CURRENT_PAGE_WALL';
const CLEARE_WALL_POSTS = 'CLEARE_WALL_POSTS';
const CLEARE_PROFILE = 'CLEARE_PROFILE';
const SET_NEW_POST = 'SET_NEW_POST';
const COUNT_PROFILE_PHOTOS = 'COUNT_PROFILE_PHOTOS';
const SET_CURRENT_PAGE_PHOTOS = 'SET_CURRENT_PAGE_PHOTOS';
const CLEARE_PAGE_PHOTOS = 'CLEARE_PAGE_PHOTOS';
const SET_PROFILE_PHOTOS = 'SET_PROFILE_PHOTOS';
const SET_NEW_PHOTOS = 'SET_NEW_PHOTOS';





let initialState = {
    wallPosts: [],
    profilePhotos: [],
    profile: null,
    status: '',
    randomFriends: null,
    totalWallCount: null,
    totalPhotosCount: null,
    currentPageWall: 1,
    currentPagePhotos: 1,
    pageSizeWall: 10,
    pageSizePhotos: 10,
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }

        case SET_STATUS:
            return {
                ...state,
                profile: { ...state.profile, profile: { ...state.profile.profile, status: action.status } }
            }

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, profile: { ...state.profile.profile, profilePicture: action.photos } }
            }

        case SET_WALL_POSTS:
            return {
                ...state,
                wallPosts: state.wallPosts.concat(action.wallPosts)
            }

        case SET_PROFILE_PHOTOS:
            return {
                ...state,
                profilePhotos: state.profilePhotos.concat(action.profilePhotos)
            }

        case COUNT_WALL_POSTS:
            return {
                ...state,
                totalWallCount: action.totalWallCount
            }

        case COUNT_PROFILE_PHOTOS:
            return {
                ...state,
                totalPhotosCount: action.totalPhotosCount
            }

        case SET_CURRENT_PAGE_WALL:
            return {
                ...state,
                currentPageWall: action.currentPageWall
            }

        case SET_CURRENT_PAGE_PHOTOS:
            return {
                ...state,
                currentPagePhotos: action.currentPagePhotos
            }

        case CLEARE_WALL_POSTS:
            return {
                ...state,
                wallPosts: []
            }

        case CLEARE_PAGE_PHOTOS:
            return {
                ...state,
                profilePhotos: []
            }

        case CLEARE_PROFILE:
            return {
                ...state,
                profile: null
            }

        case SET_RANDOM_FRIENDS:
            return {
                ...state,
                randomFriends: action.randomFriends
            }

        case SET_NEW_POST:
            return {
                ...state,
                wallPosts: [action.post, ...state.wallPosts]
            }

        case SET_NEW_PHOTOS:
            return {
                ...state,
                profilePhotos: [...action.newPhotos, ...state.profilePhotos]
            }

        default: return state;
    }
}

//-----------------------ACTIONS------------------------------------//

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
});


export const setStatus = (status) => ({
    type: SET_STATUS,
    status
})


export const savePhotoSuccess = (photos) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
})

const getRandomFriendSuccess = (randomFriends) => ({
    type: SET_RANDOM_FRIENDS,
    randomFriends
})

const setWallPosts = (wallPosts) => ({
    type: SET_WALL_POSTS,
    wallPosts
})

const setProfilePhotos = (profilePhotos) => ({
    type: SET_PROFILE_PHOTOS,
    profilePhotos
})

export const clearProfile = () => ({
    type: CLEARE_PROFILE
})

export const setWallCount = (totalWallCount) => ({
    type: COUNT_WALL_POSTS,
    totalWallCount
})

export const setPhotoslCount = (totalPhotosCount) => ({
    type: COUNT_PROFILE_PHOTOS,
    totalPhotosCount
})

const setNewPost = (post) => ({
    type: SET_NEW_POST,
    post
})

const setNewPhotos = (newPhotos) => ({
    type: SET_NEW_PHOTOS,
    newPhotos
})

export const setWallCurrentPage = (currentPageWall) => ({
    type: SET_CURRENT_PAGE_WALL,
    currentPageWall
})

export const setPhotosCurrentPage = (currentPagePhotos) => ({
    type: SET_CURRENT_PAGE_PHOTOS,
    currentPagePhotos
})

export const clearWallPosts = () => ({
    type: CLEARE_WALL_POSTS
})

export const clearProfilePhotos = () => ({
    type: CLEARE_PAGE_PHOTOS
})

//---------------------------------------------------//
//------------------------------MIDDLEWARES--------------------------//
export const getProfile = (id) => async (dispatch) => {
    let response = await newProfileAPI.getProfile(id)
    if (response.data.success) {
        dispatch(setUserProfile(response.data.profile));
        dispatch(setStatus(response.data.profile.profile.status))
    } else {
        return response.data.Error || response.data.errors
    }
}

export const getPosts = (currentPage, pageSize, id) => async (dispatch) => {
    let response = await newProfileAPI.getPosts(id, currentPage, pageSize);
    if (response.data.success) {
        dispatch(setWallPosts(response.data.posts));
        dispatch(setWallCount(response.data.postsCount))
    }
}

export const getPhotos = (currentPage, pageSize, id) => async (dispatch) => {
    let response = await newProfileAPI.getPhotos(id, currentPage, pageSize);
    if (response.data.success) {
        dispatch(setProfilePhotos(response.data.profilePhotos));
        dispatch(setPhotoslCount(response.data.photosCount))
    }

}


export const updateStatus = (newStatus) => async (dispatch) => {
    let response = await newProfileAPI.updateStatus(newStatus)
    if (response.data.success) {
        dispatch(setStatus(response.data.user.profile.status));
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let formData = new FormData();
    formData.append('profilePicture', file);
    let response = await newProfileAPI.updatePhoto(formData);
    if (response.data.success) {
        dispatch(savePhotoSuccess(response.data.user.profile.profilePicture))
    }
}

export const updateProfile = (profile) => async (dispatch) => {
        let response = await newProfileAPI.updateProfile(profile);
        if (response.data.success) {
            dispatch(setUserProfile(response.data.user));
            return "success";
        } else { return response.data.messages }
}

export const getFriends = (id) => async (dispatch) => {
    let response = await newUsersAPI.getFriends(id, true);
    if (response.data.success) dispatch(getRandomFriendSuccess(response.data.randomFriends));

}



export const addNewPostThunk = (data) => async (dispatch) => {
    const response = await newNewsAPI.addNewPost(data);
    if (response.data.success) dispatch(setNewPost(response.data.post))
}

export const addNewPhotosThunk = (data) => async (dispatch) => {
    const response = await newProfileAPI.addNewPhotos(data);
    if (response.data.success) dispatch(setNewPhotos(response.data.savedPhotos))
}

//---------------------------------------------------//

export default profileReducer;