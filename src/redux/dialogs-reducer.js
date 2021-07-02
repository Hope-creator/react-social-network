import { newProfileAPI, newDialogsAPI } from "../api/api";
import { onMessage } from "../socket";
import { updateArray } from "../utils/helpers/updateArray";

const ADD_MESSAGE = 'ADD-MESSAGE';
const SET_CONVERSATIONS_PROFILES = 'SET_MESSAGES_PROFILES';
const SET_OWNER_PROFILE = 'SET_OWNER_PROFILE';
const CLEARE_CONVERSATIONS_PROFILES = 'CLEARE_MESSAGES_PROFILES';
const SET_CONVERSATIONS = 'SET_CONVERSATIONS';
const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';
const SET_CONVERSATIONS_COUNT = 'SET_CONVERSATIONS_COUNT';
const SET_CURRENT_PAGE_CONVERSATIONS = 'SET_CURRENT_PAGE_CONVERSATIONS';
const SET_MESSAGES = 'SET_MESSAGES';
const SET_MESSAGES_COUNT = 'SET_MESSAGES_COUNT';
const SET_CURRENT_PAGE_MESSAGES = 'SET_CURRENT_PAGE_MESSAGES';
const SET_CURRENT_CONVERSATION_PROFILE = 'SET_CURRENT_CONVERSATION_PROFILE';
const SET_NEW_MESSAGE = 'SET_NEW_MESSAGE';
const CLEAR_CONVERSATIONS = 'CLEAR_CONVERSATIONS';
const CLEAR_MESSAGES = 'CLEAR_MESSAGES';
const CLEAR_CURRENT_CONVERASTION_PROFILE = 'CLEAR_CURRENT_CONVERASTION_PROFILE';
const CLEAR_ALL_DIALOGS = 'CLEAR_ALL';


let initialState = {
    messages: [],
    conversations: [],
    ownerProfile: null,
    conversationsProfiles: [],
    conversationsCount: 10,
    messagesCount: 50,
    currentConversationProfile: null,
    currentPageConversations: 1,
    pageSizeConversations: 30,
    currentPageMessages: 1,
    pageSizeMessages: 30,
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_CONVERSATIONS_PROFILES: return {
            ...state,
            conversationsProfiles: state.conversationsProfiles.concat(action.newConversationProfile)
        }

        case CLEARE_CONVERSATIONS_PROFILES: return {
            ...state,
            conversationsProfiles: []
        }

        case SET_OWNER_PROFILE:
            return {
                ...state,
                ownerProfile: action.ownerProfile
            }

        case SET_CURRENT_CONVERSATION_PROFILE:
            return {
                ...state,
                currentConversationProfile: action.profile
            }

        case SET_CONVERSATIONS:
            return {
                ...state,
                conversations: state.conversations.concat(action.newConversations)
            }

        case SET_CONVERSATIONS_COUNT:
            return {
                ...state,
                conversationsCount: action.conversationsCount
            }

        case CLEAR_CONVERSATIONS:
            return {
                ...state,
                conversations: []
            }

        case SET_CURRENT_PAGE_CONVERSATIONS:
            return {
                ...state,
                currentPageConversations: action.currentPage
            }

        case UPDATE_CONVERSATION:
            return {
                ...state,
                conversations: updateArray(action.newConversation, state.conversations)
            }

        case SET_MESSAGES:
            return {
                ...state,
                messages: state.messages.concat(action.newMessages)
            }

        case SET_NEW_MESSAGE:
            return {
                ...state,
                messages: [action.newMessage, ...state.messages]
            }

        case CLEAR_MESSAGES:
            return {
                ...state,
                messages: [],
                messagesCount: 10
            }

        case SET_MESSAGES_COUNT:
            return {
                ...state,
                messagesCount: action.messagesCount
            }

        case SET_CURRENT_PAGE_MESSAGES:
            return {
                ...state,
                currentPageMessages: action.currentPage
            }

        case CLEAR_CURRENT_CONVERASTION_PROFILE:
            return {
                ...state,
                currentConversationProfile: null
            }

        case CLEAR_ALL_DIALOGS:
            return initialState

        default: return state;
    }
}

export const addMessage = (userId, fromId, message, date) => ({
    type: ADD_MESSAGE,
    userId,
    fromId,
    message,
    date: date
});

export const clearAllDialogs = () => ({
    type: CLEAR_ALL_DIALOGS
})

export const clearMessages = () => ({
    type: CLEAR_MESSAGES
});

export const clearConversations = () => ({
    type: CLEAR_CONVERSATIONS
})

export const clearCurrentConverastionProfile = () => ({
    type: CLEAR_CURRENT_CONVERASTION_PROFILE
})

export const setConversationProfiles = (newConversationProfile) => ({
    type: SET_CONVERSATIONS_PROFILES,
    newConversationProfile
});

export const setOwnerProfile = (ownerProfile) => ({
    type: SET_OWNER_PROFILE,
    ownerProfile
});

export const setCurrentConversationProfile = (profile) => ({
    type: SET_CURRENT_CONVERSATION_PROFILE,
    profile
});

export const setNewMessages = (newMessages) => ({
    type: SET_MESSAGES,
    newMessages
});

export const setNewOneMessage = (newMessage) => ({
    type: SET_NEW_MESSAGE,
    newMessage
})

export const setMessagesCount = (messagesCount) => ({
    type: SET_MESSAGES_COUNT,
    messagesCount
});

export const setMessagesCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE_MESSAGES,
    currentPage
});

export const setNewConversations = (newConversations) => ({
    type: SET_CONVERSATIONS,
    newConversations
});

export const setConversationsCount = (conversationsCount) => ({
    type: SET_CONVERSATIONS_COUNT,
    conversationsCount
});

export const setConversationsCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE_CONVERSATIONS,
    currentPage
});

export const clearMessagesProfiles = () => ({
    type: CLEARE_CONVERSATIONS_PROFILES
});

export const updateConversation = (newConversation) => ({
    type: UPDATE_CONVERSATION,
    newConversation
})



export const getOwnerProfile = (ownerId) => async (dispatch) => {
    try {
        let response = await newProfileAPI.getProfile(ownerId);
        if (response && response.data.success) dispatch(setOwnerProfile(response.data.profile));
    }
    catch (e) {
        console.log(e)
    }
}

export const getCurrentConversationProfile = (id) => async (dispatch) => {
    try {
        let response = await newProfileAPI.getProfile(id);
        if (response && response.data.success) dispatch(setCurrentConversationProfile(response.data.profile));
    }
    catch (e) {
        console.log(e)
    }
}


export const getConversationsProfiles = (id) => async dispatch => {
    try {
        let response = await newProfileAPI.getProfile(id);
        if (response && response.data.success) {
            dispatch(setConversationProfiles(response.data.profile));
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

export const getConversations = (currentPage, pageSize) => async (dispatch) => {
    try {
        let response = await newDialogsAPI.getConversations(currentPage, pageSize);
        if (response && response.data.success) {
            dispatch(setNewConversations(response.data.conversations));
            dispatch(setConversationsCount(response.data.conversationsCount));
            response.data.conversations.forEach(async c => {
                getConversationsProfiles(c.peerId)(dispatch)
            })
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const getMessages = (currentPage, pageSize, peerId) => async (dispatch) => {
    try {
        let response = await newDialogsAPI.getMessages(currentPage, pageSize, peerId);
        if (response && response.data.success) {
            dispatch(setNewMessages(response.data.messages));
            dispatch(setMessagesCount(response.data.messagesCount));
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const onMessageThunk = (content, to, context) => dispatch => {
    onMessage(content, to, context)(dispatch);
}


export default dialogsReducer;