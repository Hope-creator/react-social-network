import React, { useState } from "react";
import Avatar from "../Avatar";
import Preloader from "../../parts/preloader";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/helpers/formatDate";
import Modal from "../Modal";

import "./Post.scss";

const Post = ({ post, profile }) => {
  const [fullScreenImage, setFullScreenImage] = useState("");

  const setFullScreen = React.useCallback((src) => {
    setFullScreenImage(src);
  }, []);

  const cleanFullImage = React.useCallback(() => {
    setFullScreenImage("");
  }, []);

  if (!post) return <Preloader />;

  return (
    <div>
      <div className="post__header">
        <Link to={`/profile/${profile._id}`}>
          <Avatar
            className="post__header-image"
            src={profile.profile.profilePicture}
          />
        </Link>
        <div className="post__header-info">
          <Link to={`/profile/${profile._id}`}>
            <span className="post__name">{profile.name}</span>
          </Link>
          <span>{`on ${formatDate(+Date.parse(post.ts))}`}</span>
        </div>
      </div>
      <div className="post__content">
        <span className="post__content-text">{post.detail.text}</span>
        <div className="post__content-mediaContainer">
          {post.detail.attachments &&
            post.detail.attachments.map((item, index, array) =>
              item.type === "image" ? (
                <img
                  onClick={() => {
                    setFullScreen(item.url);
                  }}
                  key={item.url}
                  className={
                    array.length === 1
                      ? "post__content-mediaItem"
                      : "post__content-mediaItem_small"
                  }
                  src={item.url}
                  alt={`photo__${item.url}`}
                />
              ) : item.type === "video" ? (
                <video
                  key={item.url}
                  className={
                    array.length === 1
                      ? "post__content-mediaItem"
                      : "post__content-mediaItem_small"
                  }
                  src={item.url}
                  alt={`video__${item.url}`}
                  controls
                ></video>
              ) : null
            )}
        </div>
      </div>
      {fullScreenImage ? (
        <Modal handleClose={cleanFullImage}>
          <img src={fullScreenImage} alt={`picture__${fullScreenImage}`} />
        </Modal>
      ) : null}
    </div>
  );
};

export default Post;
