import React, { useState } from "react";
import Preloader from "../../parts/preloader";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { formatDate } from "../../utils/helpers/formatDate";
import Modal from "../Modal";

import "./NewsItem.scss";

const NewsItem = ({ profile, date, text, attachments }) => {
  let [fullScreenImage, setFullScreenImage] = useState("");

  const setFullScreen = React.useCallback((src) => {
    setFullScreenImage(src);
  }, []);

  const cleanFullImage = React.useCallback(() => {
    setFullScreenImage("");
  }, []);

  if (!profile) return <Preloader />;

  return (
    <div className="newsItem">
      <div className="newsItem__header">
        <Link className="newsItem__header-link" to={`/profile/${profile._id}`}>
          <Avatar
            className="newsItem__avatar"
            src={profile.profile.profilePicture}
          />
        </Link>
        <div className="newsItem__header-info">
          <Link to={`/profile/${profile._id}`}>
            <span>{profile.name}</span>
          </Link>
          <span>on {formatDate(+Date.parse(date))}</span>
        </div>
      </div>
      <div className="newsItem__content">
        <span className="newsItem__content-text">{text}</span>
        <div className="newsItem__media">
          {attachments &&
            attachments.map((item, index, array) =>
              item.type === "image" ? (
                <img
                  key={item.url}
                  onClick={() => {
                    setFullScreen(item.url);
                  }}
                  className={
                    array.length === 1
                      ? "newsItem__media-item"
                      : "newsItem__media-item_small"
                  }
                  src={item.url}
                  alt={`photo__${item.url}`}
                />
              ) : item.type === "video" ? (
                <video
                  key={item.url}
                  className={
                    array.length === 1
                      ? "newsItem__media-item"
                      : "newsItem__media-item_small"
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
          <img src={fullScreenImage} alt="" />
        </Modal>
      ) : null}
    </div>
  );
};

export default NewsItem;
