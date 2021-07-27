import * as actions from "./actions";
import produce from "immer";

const initialState = {
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
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.SET_CONVERSATIONS_PROFILES: {
        draft.conversationsProfiles = [
          ...state.conversationsProfiles,
          action.payload.newConversationProfile,
        ];
        break;
      }

      case actions.CLEARE_CONVERSATIONS_PROFILES: {
        draft.conversationsProfiles = [];
        break;
      }

      case actions.SET_OWNER_PROFILE: {
        draft.ownerProfile = action.payload.ownerProfile;
        break;
      }

      case actions.SET_CURRENT_CONVERSATION_PROFILE: {
        draft.currentConversationProfile = action.payload.profile;
        break;
      }

      case actions.SET_CONVERSATIONS: {
        draft.conversations = [
          ...state.conversations,
          ...action.payload.newConversations,
        ];
        break;
      }

      case actions.SET_CONVERSATIONS_COUNT: {
        draft.conversationsCount = action.payload.conversationsCount;
        break;
      }

      case actions.CLEAR_CONVERSATIONS: {
        draft.conversations = [];
        break;
      }

      case actions.SET_CURRENT_PAGE_CONVERSATIONS: {
        draft.currentPageConversations = action.payload.currentPage;
        break;
      }

      case actions.UPDATE_CONVERSATION: {
        const index = draft.conversations.findIndex(
          (conv) => conv._id === action.payload.newConversation._id
        );
        if (index !== -1) {
          draft.conversations[index] = action.payload.newConversation;
        } else {
          draft.conversations = [
            action.payload.newConversation,
            ...state.conversations,
          ];
        }
        break;
      }

      case actions.SET_MESSAGES: {
        draft.messages = [...state.messages, ...action.payload.newMessages];
        break;
      }

      case actions.SET_NEW_MESSAGE: {
        draft.messages = [action.payload.newMessage, ...state.messages];
        break;
      }

      case actions.CLEAR_MESSAGES: {
        draft.messages = [];
        draft.messagesCount = 10;
        break;
      }

      case actions.SET_MESSAGES_COUNT: {
        draft.messagesCount = action.payload.messagesCount;
        break;
      }

      case actions.SET_CURRENT_PAGE_MESSAGES: {
        draft.currentPageMessages = action.payload.currentPage;
        break;
      }

      case actions.CLEAR_CURRENT_CONVERASTION_PROFILE: {
        draft.currentConversationProfile = null;
        break;
      }

      case actions.CLEAR_ALL_DIALOGS: {
        return initialState
      }

      default:
        break;
    }
  });

export default reducer;
