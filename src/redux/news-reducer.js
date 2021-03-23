import { profileAPI } from "../api/api";
import testVideoFile from "..//videos/PexelsVideos.mp4";
import testVideoFile2 from "../videos/PexelVideos1858244.mp4"

const SET_PROFILE = 'SET_PROFILE';
const SET_NEWS_PROFILES = 'SET_NEWS_PROFILES';
const CLEARE_NEWS_PROFILES = 'CLEARE_NEWS_PROFILES';
const ADD_NEW = 'ADD_NEW';

let initialState = {
    newsItems: [
        {
            id: 1,
            userId: 11853,
            type: "post",
            date: 1470313280000,
            text: "My photos i did yesterday",
            attachments: [
                { id: -1, type: "photo", date: 1470313280000, ownerId: 11853, url: 'https://images.unsplash.com/photo-1551258235-ad5cda01926d?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
                { id: -2, type: "photo", date: 1470313280000, ownerId: 11853, url: 'https://images-na.ssl-images-amazon.com/images/I/711lRhnefNL._AC_SL1000_.jpg' },
                { id: -3, type: "photo", date: 1470313280000, ownerId: 11853, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cuDJfbIR2iMXf3BIC5kmw8EFqiFDMs7jIw&usqp=CAU' },
                { id: -4, type: "photo", date: 1470313280000, ownerId: 11853, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cuDJfbIR2iMXf3BIC5kmw8EFqiFDMs7jIw&usqp=CAU' },
                { id: -5, type: "video", date: 1470313280000, ownerId: 11853, url: testVideoFile2 }
            ]
        },
        {
            id: 2,
            userId: 8162,
            type: "photo",
            date: 1580745020000,
            text: "This is amazing nature photo",
            rate: 0,
            attachments: [{ id: -6, type: "photo", date: 1580745020000, ownerId: 11853, url: 'https://scx2.b-cdn.net/gfx/news/hires/2019/2-nature.jpg' }]
        },
        {
            id: 3,
            userId: 9604,
            type: "video",
            date: 1581045020000,
            text: "Amazing video",
            attachments: [{ id: -7, type: "video", date: 1581045020000, ownerId: 11853, url: testVideoFile }]
        },
        {
            id: 4,
            userId: 9607,
            type: "photo",
            date: 1581345020000,
            text: "",
            rate: 0,
            attachments: [{ id: -8, type: "photo", date: 1580745020000, ownerId: 11853, url: 'https://images.unsplash.com/photo-1606755657489-f989fe063791?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDIwfDZzTVZqVExTa2VRfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }]
        },
        {
            id: 5,
            userId: 9555,
            type: "post",
            date: 1581745020000,
            text: "Testing many symbols without break aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            attachments: []
        },
        {
            id: 6,
            userId: 9555,
            type: "post",
            date: 1581745020000,
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad blanditiis perspiciatis praesentium quaerat repudiandae soluta? Cum doloribus esse et eum facilis impedit officiis omnis optio, placeat, quia quo reprehenderit sunt velit? Asperiores cumque deserunt eveniet hic reprehenderit sit, ut voluptatum?",
            attachments: []
        }

    ],
    profile: null,
    newsProfiles: [],
    lastAttachemtId: -8
}

const newsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_PROFILE: return {
            ...state,
            profile: action.profile
        }

        case SET_NEWS_PROFILES: return {
            ...state,
            newsProfiles: [...state.newsProfiles, action.newsProfile]
        }

        case CLEARE_NEWS_PROFILES: return {
            ...state,
            newsProfiles: []
        }

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
            lastAttachemtId: state.lastAttachemtId -1
        }

        default: return state;
    }
}


// actions
const setProfile = (profile) => ({
    type: SET_PROFILE,
    profile
});

const setNewsProfile = (newsProfile) => ({
    type: SET_NEWS_PROFILES,
    newsProfile
});

export const clearNewsProfiles = () => ({
    type: CLEARE_NEWS_PROFILES
});

export const addNew = (userId, postType, date, text , attachments) => ({
    type: ADD_NEW,
    userId,
    postType,
    date,
    text,
    attachments
})


// thunks
export const getProfile = (id) => async (dispatch) => {
    let response = await profileAPI.getProfile(id);
    dispatch(setProfile(response.data));
}

export const getNewsProfiles = (id) => async (dispatch) => {
    let response = await profileAPI.getProfile(id);
    dispatch(setNewsProfile(response.data));
}


export default newsReducer;