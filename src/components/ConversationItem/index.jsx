import React from "react";
import { NavLink } from "react-router-dom";
import Preloader from "../../parts/preloader";
import { formatDate } from "../../utils/helpers/formatDate";
import Avatar from "../Avatar";

import "./ConversationItem.scss";

const ConversationItem = ({
  profile,
  conversation,
  setCurrentConversation,
  ownerProfile,
  setCurrentConversationId,
}) => {
  if (!profile || !conversation) return <Preloader />;

  const lastMessage = conversation.lastMessage;

  return (
    <div
      className="conversationItem"
      onClick={() => {
        setCurrentConversation(conversation.peerId);
        setCurrentConversationId(conversation._id);
      }}
    >
      <div className="conversationItem__profile">
        <NavLink
          to={"/dialogs/" + profile._id}
          className="conversationItem__link"
        >
          <div>
            <Avatar
              className="conversationItem__avatar"
              src={profile.profile.profilePicture}
            />
          </div>
        </NavLink>
      </div>
      <div className="conversationItem__content">
        <span className="conversationItem__name">{profile.name}</span>
        <span className="conversationItem__time">
          {formatDate(conversation.lastMessage.ts)}
        </span>
        <div
          className={
            conversation.unread
              ? "conversationItem__message_unread"
              : "conversationItem__message"
          }
        >
          {lastMessage.text && (
            <span>
              {conversation.lastMessage.fromId === ownerProfile._id ? (
                <Avatar
                  className="conversationItem__message__avatar"
                  src={ownerProfile.profile.profilePicture}
                />
              ) : null}
              {lastMessage.text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
