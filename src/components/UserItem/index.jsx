import React from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../Avatar";

import "./UserItem.scss";

const UserItem = ({
  user,
  ownerId,
  followingInProgress,
  unfollow,
  follow,
  className,
}) => {
  return (
    <div className={className ? "userItem " + className : "userItem"}>
      <div className="userItem__header">
        <NavLink className="userItem__link" to={"/profile/" + user._id}>
          <Avatar src={user.profile.profilePicture} />
        </NavLink>
        <div className="userItem__header-content">
          <h4 className="userItem__header-name">{user.name}</h4>
          <span>
            <i className="fas fa-users"></i> {user.followers.length}
          </span>
          <span>
            <i className="fas fa-camera"></i> 0
          </span>
          <span>
            <i className="fas fa-video"></i> 0
          </span>
        </div>
      </div>
      <div className="userItem__body">
        <span>Status:</span>
        <div>
          <span>
            {user.profile.status != null
              ? user.profile.status
              : "Status is not taken by"}
          </span>
        </div>
      </div>
      <div className="userItem__footer">
        {user.followers.includes(ownerId) && user._id !== ownerId ? (
          <button
            className="userItem__button"
            disabled={followingInProgress.some((id) => id === user._id)}
            onClick={() => {
              unfollow(user._id);
            }}
          >
            Unfollow
          </button>
        ) : user._id === ownerId ? null : (
          <button
            className="userItem__button"
            disabled={followingInProgress.some((id) => id === user._id)}
            onClick={() => {
              follow(user._id);
            }}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default UserItem;
