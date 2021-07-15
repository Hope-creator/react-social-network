import React from "react";
import profilePicture from "../../img/profilePic.png";

import "./Avatar.scss";

const Avatar = ({ className, src }) => {
  return (
    <img
      className={"avatar " + className}
      src={src || profilePicture}
      alt={`Pic`}
    />
  );
};

export default Avatar;
