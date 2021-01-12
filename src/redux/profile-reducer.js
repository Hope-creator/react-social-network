import { profileAPI, usersAPI } from "../api/api";

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const SET_FRIENDS = 'SET_FRIENDS';





let initialState = {
    profilePhotos: [
        {id: 1,album_id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvIhV8Pk1u_d3Y3fd7vm5OoqmV1a_AZjVDkw&usqp=CAU' },
        {id: 2,album_id: 1, src: 'https://helpx.adobe.com/content/dam/help/en/photoshop/how-to/best-format-to-save-photos_297x176.jpg' },
        {id: 3,album_id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzDCKjXF-cQzx2_zCVlkaTIC2BhdYbizRbmA&usqp=CAU' },
        {id: 4,album_id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl-U2Bu1dOVzO3EEXdihzV75tnkbO5Y9GVWA&usqp=CAU' },
        {id: 5,album_id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDEdyxcqRnufTlzOgrDhManC7V9S8U8pV3iA&usqp=CAU' },
        {id: 5,album_id: 1, src: 'https://eskipaper.com/images/large-2.jpg' }
    ]
    ,
    
    profile: null,
    status: '',
    friends: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }

        case SET_STATUS:
            return {
                ...state, status: action.status
            }

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }

        case UPDATE_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_FRIENDS: 
            return {
                ...state,
                friends: action.friends
            }

        default: return state;
    }
}

//-----------------------ACTIONS------------------------------------//

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });


export const setStatus = (status) => ({
    type: SET_STATUS,
    status
})


export const savePhotoSuccess = (photos) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos
})

const updateProfileSuccess = (profile) => ({
    type: UPDATE_PROFILE,
    profile
})

const getFriendSuccess = (friends) => ({
    type: SET_FRIENDS,
    friends
})
//---------------------------------------------------//
//------------------------------MIDDLEWARES--------------------------//
export const getProfile = (id) => async (dispatch) => {
    let response = await profileAPI.getProfile(id)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (id) => async (dispatch) => {
    let response = await profileAPI.getStatus(id)
        dispatch(setStatus(response.data))
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
}

export const savePhoto = (file) => async (dispatch) => {
    let formData = new FormData();
    formData.append('image', file);
    let response = await profileAPI.updatePhoto(formData);
        if (response.data.resultCode === 0) {

            dispatch(savePhotoSuccess(response.data.data.photos));
        }
}

export const updateProfile = (profile) => async (dispatch) => {
    try{
        let response = await profileAPI.updateProfile(profile);
    
        if (response.data.resultCode === 0) {
            dispatch(updateProfileSuccess(profile));
            return 'success'
        }
        else{return response.data.messages}}
        catch(err) {console.log(err)}
}

export const getFriends = () => async (dispatch) => {
    let response = await usersAPI.getFriends();
    let copyResponse = [...response.data.items];
    let randomTenFriends = [];
    for (let i = 0; i<10;i++) {
        let randomInt = Math.floor(Math.random() * copyResponse.length);
        randomTenFriends = [...randomTenFriends,copyResponse[randomInt]];
        copyResponse.splice(randomInt, 1);
    }
    dispatch(getFriendSuccess(randomTenFriends));
}
//---------------------------------------------------//

export default profileReducer;