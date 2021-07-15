import * as actions from "./actions";

const clearAllDialogs = () => ({
  type: actions.CLEAR_ALL_DIALOGS,
});

const clearMessages = () => ({
  type: actions.CLEAR_MESSAGES,
});

const clearConversations = () => ({
  type: actions.CLEAR_CONVERSATIONS,
});

const clearCurrentConverastionProfile = () => ({
  type: actions.CLEAR_CURRENT_CONVERASTION_PROFILE,
});

const clearMessagesProfiles = () => ({
  type: actions.CLEARE_CONVERSATIONS_PROFILES,
});

const setConversationProfiles = (newConversationProfile) => ({
  type: actions.SET_CONVERSATIONS_PROFILES,
  payload: { newConversationProfile },
});

const setOwnerProfile = (ownerProfile) => ({
  type: actions.SET_OWNER_PROFILE,
  payload: { ownerProfile },
});

const setCurrentConversationProfile = (profile) => ({
  type: actions.SET_CURRENT_CONVERSATION_PROFILE,
  payload: { profile },
});

const setNewMessages = (newMessages) => ({
  type: actions.SET_MESSAGES,
  payload: { newMessages },
});

const setNewOneMessage = (newMessage) => ({
  type: actions.SET_NEW_MESSAGE,
  payload: { newMessage },
});

const setMessagesCount = (messagesCount) => ({
  type: actions.SET_MESSAGES_COUNT,
  payload: { messagesCount },
});

const setMessagesCurrentPage = (currentPage) => ({
  type: actions.SET_CURRENT_PAGE_MESSAGES,
  payload: { currentPage },
});

const setNewConversations = (newConversations) => ({
  type: actions.SET_CONVERSATIONS,
  payload: { newConversations },
});

const setConversationsCount = (conversationsCount) => ({
  type: actions.SET_CONVERSATIONS_COUNT,
  payload: { conversationsCount },
});

const setConversationsCurrentPage = (currentPage) => ({
  type: actions.SET_CURRENT_PAGE_CONVERSATIONS,
  payload: { currentPage },
});

const updateConversation = (newConversation) => ({
  type: actions.UPDATE_CONVERSATION,
  payload: { newConversation },
});

export {
  clearAllDialogs,
  clearMessages,
  clearConversations,
  clearCurrentConverastionProfile,
  clearMessagesProfiles,
  setConversationProfiles,
  setOwnerProfile,
  setCurrentConversationProfile,
  setNewMessages,
  setNewOneMessage,
  setMessagesCount,
  setMessagesCurrentPage,
  setNewConversations,
  setConversationsCount,
  setConversationsCurrentPage,
  updateConversation,
};
