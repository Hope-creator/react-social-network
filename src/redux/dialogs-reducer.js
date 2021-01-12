import { profileAPI } from "../api/api";

const ADD_MESSAGE = 'ADD-MESSAGE';
const SET_MESSAGES_PROFILES = 'SET_MESSAGES_PROFILES';
const SET_OWNER_PROFILE = 'SET_OWNER_PROFILE';
const CLEARE_MESSAGES_PROFILES = 'CLEARE_MESSAGES_PROFILES';

let initialState = {
    dialogsMessages: [
        { userId: 11853, fromId: 11853, id: 1, date:1470313280000, message: "Hi1" },
        { userId: 11853, fromId: 11853, id: 2, date:1525443680000, message: "Hi2" },
        { userId: 11853, fromId: null, id: 3, date:1578142220000, message: "Hi3" },
        { userId: 8162, fromId: null, id: 4, date:1580745020000, message: "Yo, how are you1" },
        { userId: 8162, fromId: null, id: 5, date:1580845020000, message: "Yo, how are you2" },
        { userId: 8162, fromId: 8162, id: 6, date:1580945020000, message: "Yo, how are you3" },
        { userId: 8162, fromId: 8162, id: 7, date:1581045020000, message: "Yo, how are you4" },
        { userId: 9604, fromId: 9604, id: 8, date:1581145020000, message: "Hi honey, call me when you wake up.1" },
        { userId: 9604, fromId: 9604, id: 9, date:1581245020000, message: "Hi honey, call me when you wake up.2" },
        { userId: 9607, fromId: null, id: 10, date:1581345020000, message: "Uo1" },
        { userId: 9607, fromId: 9607, id: 11, date:1581445020000, message: "Uo2" },
        { userId: 9607, fromId: 9607, id: 12, date:1581545020000, message: "Uo3" },
        { userId: 9607, fromId: 9607, id: 13, date:1581645020000, message: "Uo4" },
        { userId: 9555, fromId: null, id: 14, date:1581745020000, message: "Yo4" },
       /* { userId: 12924, fromId: 12924, id: 18, message: "Yo4" },*/
    ],
    messagesProfiles: [],
    ownerProfile: null
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: return {
            ...state,
            dialogsMessages: [...state.dialogsMessages,
            { id: state.dialogsMessages.length + 1,
                message: action.message,
                userId: action.userId,
                fromId: action.fromId,
                date: action.date
             }
            ]
        }

        case SET_MESSAGES_PROFILES: return {
            ...state,
            messagesProfiles: [...state.messagesProfiles, action.messageProfile]
        }

        case CLEARE_MESSAGES_PROFILES: return {
            ...state,
            messagesProfiles: []
        }

        case SET_OWNER_PROFILE:
            return {
                ...state,
                ownerProfile: action.ownerProfile,
                ownerId: action.ownerProfile.userId,
                dialogsMessages: state.dialogsMessages.map(m => {if (!m.fromId) m.fromId = action.ownerProfile.userId; return m})
            }

        default: return state;
    }
}

export const addMessage = (userId,fromId,message, date) => ({ type: ADD_MESSAGE,userId, fromId, message, date: date});

export const setMessagesProfiles = (messageProfile) => ({ type: SET_MESSAGES_PROFILES, messageProfile });

export const setOwnerProfile = (ownerProfile) => ({ type: SET_OWNER_PROFILE, ownerProfile });

export const clearMessagesProfiles = () => ({ type: CLEARE_MESSAGES_PROFILES });

export const getOwnerProfile = (ownerId) => async (dispatch) => {
    let response = await profileAPI.getProfile(ownerId);
    dispatch(setOwnerProfile(response.data));
}


export const getMessagesProfiles = (id) => async (dispatch) => {
    let response = await profileAPI.getProfile(id);
    dispatch(setMessagesProfiles(response.data));
}


export default dialogsReducer;