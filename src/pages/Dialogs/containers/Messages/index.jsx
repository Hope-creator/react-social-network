import React, { useEffect } from "react";
import { withGetOnScroll } from "../../../../hoc/withGetOnScroll";
import Message from "../../../../components/Message";
import SendMessageForm from "../../../../components/SendMessageForm";
import Preloader from "../../../../parts/preloader";
import socket from "../../../../socket";
import Avatar from "../../../../components/Avatar";

import "./Messages.scss";

const Messages = ({
  request,
  getOnScroll,
  pageSize,
  searchName,
  clearCurrentConverastionProfile,
  clearMessages,
  currentConversation,
  setNewOneMessage,
  messages,
  readOnOpen,
  currentConversationId,
  currentConversationProfile,
  ownerProfile,
  onMessageThunk,
  setCurrentConversation,
}) => {
  useEffect(() => {
    if (messages.length > 0 && messages[0].fromId === currentConversation) {
      readOnOpen(currentConversationId);
    }
  }, [messages, currentConversation, currentConversationId, readOnOpen]);

  useEffect(() => {
    request(1, pageSize, searchName);
    getOnScroll();
    return function cleanUp() {
      clearCurrentConverastionProfile();
      clearMessages();
    };
  }, [
    request,
    getOnScroll,
    pageSize,
    searchName,
    clearCurrentConverastionProfile,
    clearMessages,
  ]);

  useEffect(() => {
    const newMessageHandler = (message) => {
      let newMessage = null;
      if (message.message && message.message.fromId === currentConversation) {
        newMessage = message.message;
      }
      if (newMessage) setNewOneMessage(newMessage);
    };
    socket.on("message", newMessageHandler);
    return function cleanUp() {
      socket.off("message", newMessageHandler);
    };
  }, [currentConversation, setNewOneMessage]);

  const handleSendMessage = React.useCallback(
    (messageText) => {
      const date = Date.now();
      const text = messageText;
      const message = {
        from: ownerProfile._id,
        peerId: currentConversation,
        ts: date,
        text: text,
        attachments: [],
      };
      onMessageThunk(message, currentConversation, 1);
    },
    [currentConversation, onMessageThunk, ownerProfile._id]
  );

  if (!currentConversationProfile) return <Preloader />;

  return (
    <>
      <div className="messages__profile">
        <div
          className="messages__link"
          type="button"
          onClick={() => setCurrentConversation("")}
        >
          <i className="fas fa-chevron-left"></i> Back to conversations
        </div>
        <Avatar
          className="messages__avatar"
          src={currentConversationProfile.profile.profilePicture}
        />
        <div>
          <span className="messages__name">{currentConversationProfile.name}</span>
        </div>
      </div>
      <SendMessageForm onSubmit={handleSendMessage} />
      {messages.map((m) => (
        <Message
          key={m._id}
          message={m}
          peerProfile={currentConversationProfile}
          ownerProfile={ownerProfile}
        />
      ))}
    </>
  );
};

export default withGetOnScroll(Messages);
