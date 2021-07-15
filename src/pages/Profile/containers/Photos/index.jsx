import React, { useEffect } from "react";
import { CancelTokens } from "../../../../api/api";
import { withGetOnScroll } from "../../../../hoc/withGetOnScroll";
import AddPhotosForm from "../../../../components/AddPhotosForm";
import Modal from "../../../../components/Modal";
import NoContentBlock from "../../../../components/NoContentBlock";

import "./Photos.scss";

const Photos = ({
  request,
  getOnScroll,
  clearProfilePhotos,
  setCurrentPage,
  profile,
  pageSize,
  photos,
  profileOwner,
  addNewPhotos,
}) => {
  useEffect(() => {
    request(1, pageSize, profile._id);
    getOnScroll();
    return function cleanUp() {
      CancelTokens.photosCancel("Fetch cancelled by user");
      clearProfilePhotos();
      setCurrentPage(1);
      window.onscroll = null;
    };
  }, [
    profile._id,
    clearProfilePhotos,
    getOnScroll,
    pageSize,
    request,
    setCurrentPage,
  ]);

  const [fullScreenImage, setFullScreenImage] = React.useState("");

  const setFullScreen = React.useCallback((src) => {
    setFullScreenImage(src);
  }, []);

  const cleanFullImage = React.useCallback(() => {
    setFullScreenImage("");
  }, []);

  return (
    <div
      className={
        photos.length > 0 ? "photosContainer" : "photosContainer_noPadding"
      }
    >
      {profileOwner && <AddPhotosForm onAddPhotosHandle={addNewPhotos} />}
      {photos.length > 0 ? (
        photos.map((p) => (
          <img
            onClick={() => setFullScreen(p.url)}
            key={p._id}
            src={p.url}
            alt={p.url}
          />
        ))
      ) : (
        <NoContentBlock icon={<i className="fas fa-camera"></i>}>
          No photos found
        </NoContentBlock>
      )}
      {fullScreenImage ? (
        <Modal handleClose={cleanFullImage}>
          <img src={fullScreenImage} alt={`picture__${fullScreenImage}`} />
        </Modal>
      ) : null}
    </div>
  );
};

export default withGetOnScroll(Photos);
