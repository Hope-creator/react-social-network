import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/helpers/formatDate";
import Avatar from "../Avatar";

import "./Message.scss";

const Message = ({ message, ownerProfile, peerProfile }) => {
  if (!message || !peerProfile || !ownerProfile) return <div>loading...</div>;

  return (
    <div
      className={
        message.fromId === ownerProfile._id
          ? "messageContainer_reverse"
          : "messageContainer"
      }
    >
      <div className="messageContainer__media">
        <Avatar
          src={
            message.fromId === ownerProfile._id
              ? ownerProfile.profile.profilePicture
              : peerProfile.profile.profilePicture
          }
          className="messageContainer__media-avatar"
        />
      </div>
      <div className="messageContainer__content">
        <div
          className={
            message.fromId === ownerProfile._id
              ? "messageContainer__content-header_reverse"
              : "messageContainer__content-header"
          }
        >
          <span className="messageContainer__name">
            <Link
              to={
                message.fromId === ownerProfile._id
                  ? `/profile/${ownerProfile._id}`
                  : `/profile/${peerProfile._id}`
              }
            >
              {message.fromId === ownerProfile._id
                ? ownerProfile.name
                : peerProfile.name}
            </Link>
          </span>
          <span className="messageContainer__date">
            {formatDate(message.ts)}
          </span>
        </div>
        <div className="messageContainer__footer">
          <span>{message.text}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
