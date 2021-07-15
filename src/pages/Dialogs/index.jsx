import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  dialogsActionCreators,
  dialogsThunks,
  dialogsSelectors,
} from "../../modules/dialogs";
import { authSelectors } from "../../modules/auth";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Conversations from "./containers/Conversations";
import Messages from "./containers/Messages";
import Preloader from "../../parts/preloader";
import { readConversation } from "../../socket";

let Dialogs = ({
  getOwnerProfile,
  ownerId,
  getCurrentConversationProfile,
  ownerProfile,
  messages,
  setMessagesCurrentPage,
  currentPageMessages,
  getMessages,
  pageSizeMessages,
  messagesCount,
  currentConversationProfile,
  clearCurrentConverastionProfile,
  clearMessages,
  setNewOneMessage,
  onMessageThunk,
  conversations,
  setConversationsCurrentPage,
  currentPageConversations,
  getConversations,
  pageSizeConversations,
  conversationsProfiles,
  conversationsCount,
  clearConversations,
  updateConversation,
  getConversationsProfiles,
  clearMessagesProfiles,
}) => {
  // set current conversation for fetch messages

  const [currentConversation, setCurrentConversation] = useState("");
  const [currentConversationId, setCurrentConversationId] = useState("");

  // .get owner profile for markup
  useEffect(() => {
    getOwnerProfile(ownerId);
  }, [ownerId, getOwnerProfile]);

  //fetch current conversation profile
  useEffect(() => {
    if (currentConversation) {
      getCurrentConversationProfile(currentConversation);
    }
  }, [currentConversation, getCurrentConversationProfile]);

  const readOnOpen = (conversation) => {
    readConversation(conversation);
  };

  // if not auth redirect to login form
  if (!ownerProfile) return <Preloader />;

  return (
    <div style={{ backgroundColor: "white", border: "1px solid #bebebe" }}>
      {currentConversation ? (
        <Messages
          messages={messages}
          setCurrentPage={setMessagesCurrentPage}
          currentPage={currentPageMessages}
          request={getMessages}
          searchName={currentConversation}
          pageSize={pageSizeMessages}
          totalCount={messagesCount}
          setCurrentConversation={setCurrentConversation}
          ownerProfile={ownerProfile}
          currentConversationProfile={currentConversationProfile}
          clearCurrentConverastionProfile={clearCurrentConverastionProfile}
          clearMessages={clearMessages}
          setNewOneMessage={setNewOneMessage}
          currentConversation={currentConversation}
          readOnOpen={readOnOpen}
          currentConversationId={currentConversationId}
          onMessageThunk={onMessageThunk}
        />
      ) : (
        <Conversations
          conversations={conversations}
          setCurrentPage={setConversationsCurrentPage}
          currentPage={currentPageConversations}
          request={getConversations}
          pageSize={pageSizeConversations}
          conversationsProfiles={conversationsProfiles}
          ownerProfile={ownerProfile}
          totalCount={conversationsCount}
          setCurrentConversation={setCurrentConversation}
          clearConversations={clearConversations}
          updateConversation={updateConversation}
          getConversationsProfiles={getConversationsProfiles}
          readOnOpen={readOnOpen}
          setCurrentConversationId={setCurrentConversationId}
          clearConversationsProfiles={clearMessagesProfiles}
        />
      )}
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    conversations: dialogsSelectors.selectConversations(state),
    conversationsProfiles: dialogsSelectors.selectConversationsProfiles(state),
    ownerId: authSelectors.selectAuthId(state),
    ownerProfile: dialogsSelectors.selectOwnerProfile(state),
    messages: dialogsSelectors.selectMessages(state),
    conversationsCount: dialogsSelectors.selectConversationsCount(state),
    messagesCount: dialogsSelectors.selectMessagesCount(state),
    currentPageConversations:
      dialogsSelectors.selectCurrentPageConversations(state),
    pageSizeConversations: dialogsSelectors.selectPageSizeConversations(state),
    currentPageMessages: dialogsSelectors.selectCurrentPageMessages(state),
    pageSizeMessages: dialogsSelectors.selectPageSizeMessages(state),
    currentConversationProfile:
      dialogsSelectors.selectCurrentConversationProfile(state),
  };
};

let mapDispatchToProps = {
  clearMessagesProfiles: dialogsActionCreators.clearMessagesProfiles,
  setConversationsCurrentPage:
    dialogsActionCreators.setConversationsCurrentPage,
  setMessagesCurrentPage: dialogsActionCreators.setMessagesCurrentPage,
  clearMessages: dialogsActionCreators.clearMessages,
  clearConversations: dialogsActionCreators.clearConversations,
  clearCurrentConverastionProfile:
    dialogsActionCreators.clearCurrentConverastionProfile,
  setNewOneMessage: dialogsActionCreators.setNewOneMessage,
  updateConversation: dialogsActionCreators.updateConversation,
  getConversationsProfiles: dialogsThunks.getConversationsProfiles,
  getOwnerProfile: dialogsThunks.getOwnerProfile,
  getConversations: dialogsThunks.getConversations,
  getMessages: dialogsThunks.getMessages,
  getCurrentConversationProfile: dialogsThunks.getCurrentConversationProfile,
  onMessageThunk: dialogsThunks.onMessageThunk,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect,
  withRouter
)(Dialogs);
