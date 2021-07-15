import React from "react";
import Preloader from "../../parts/preloader";
import { Link, NavLink } from "react-router-dom";
import Avatar from "../Avatar";

import "./FriendsBlock.scss";

const FriendsBlock = ({ profileOwner, friends }) => {
  if (!friends) return <Preloader />;

  return (
    <>
      <div className="friendsBlock__header">
        <span>Friends</span>{" "}
        {profileOwner && (
          <NavLink to="/users" className="friendsBlock__link">
            Add <i className="fas fa-plus"></i>
          </NavLink>
        )}
      </div>
      <div className="friendsBlock__content">
        <ul className="friendsBlock__grid">
          {friends.map((_friend) => {
            return (
              <li key={_friend._id}>
                <Link to={`/profile/${_friend._id}`}>
                  <Avatar src={_friend.profile.profilePicture} />
                  <span className="friendsBlock__name">{_friend.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default FriendsBlock;
