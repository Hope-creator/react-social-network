const selectDialogsPageState = (state) => state.dialogsPage;

const selectConversations = (state) =>
  selectDialogsPageState(state).conversations;

const selectConversationsProfiles = (state) =>
  selectDialogsPageState(state).conversationsProfiles;

const selectOwnerProfile = (state) =>
  selectDialogsPageState(state).ownerProfile;

const selectMessages = (state) => selectDialogsPageState(state).messages;

const selectConversationsCount = (state) =>
  selectDialogsPageState(state).conversationsCount;

const selectMessagesCount = (state) =>
  selectDialogsPageState(state).messagesCount;

const selectCurrentPageConversations = (state) =>
  selectDialogsPageState(state).currentPageConversations;

const selectPageSizeConversations = (state) =>
  selectDialogsPageState(state).pageSizeConversations;

const selectCurrentPageMessages = (state) =>
  selectDialogsPageState(state).currentPageMessages;

const selectPageSizeMessages = (state) =>
  selectDialogsPageState(state).pageSizeMessages;

const selectCurrentConversationProfile = (state) =>
  selectDialogsPageState(state).currentConversationProfile;

export {
  selectDialogsPageState,
  selectConversations,
  selectConversationsProfiles,
  selectOwnerProfile,
  selectMessages,
  selectConversationsCount,
  selectMessagesCount,
  selectCurrentPageConversations,
  selectPageSizeConversations,
  selectCurrentPageMessages,
  selectPageSizeMessages,
  selectCurrentConversationProfile,
};
