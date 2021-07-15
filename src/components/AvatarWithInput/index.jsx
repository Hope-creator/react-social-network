import React from "react";
import Avatar from "../Avatar";

import "./AvatarWithInput.scss";

const AvatarWithInput = ({ src, onUpdateHandler, className }) => {
  return (
    <div>
      <input
        type="file"
        name="file"
        id="file"
        className="avatarWithInput__input"
        onChange={onUpdateHandler}
      />
      <label className="avatarWithInput__label" htmlFor="file">
        <span>Change photo</span>
      </label>
      <Avatar
        className={
          className
            ? "avatarWithInput__avatar " + className
            : "avatarWithInput__avatar"
        }
        src={src}
      />
    </div>
  );
};

export default AvatarWithInput;
