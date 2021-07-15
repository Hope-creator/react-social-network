import React from "react";
import Preloader from "../../../../parts/preloader";
import { useState } from "react";
import Wall from "../Wall";
import Photos from "../Photos";

import "./ProfileFooter.scss";

const ProfileFooter = (props) => {
  const [selectedInfo, setSelectedInfo] = useState("Wall");

  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <ul className={"profileFooter__list"}>
        <li
          className={
            selectedInfo === "Wall"
              ? "profileFooter__list-item_active"
              : "profileFooter__list-item"
          }
          onClick={() => setSelectedInfo("Wall")}
        >
          <i className="far fa-sticky-note"></i> Wall
        </li>
        <li
          className={
            selectedInfo === "Photos"
              ? "profileFooter__list-item_active"
              : "profileFooter__list-item"
          }
          onClick={() => setSelectedInfo("Photos")}
        >
          <i className="fas fa-camera"></i> Photos
        </li>
      </ul>
      <div /*className={s.profileSideContent}*/>
        {selectedInfo === "Wall" ? (
          <Wall
            profileOwner={props.profileOwner}
            request={props.getPosts}
            clearWallPosts={props.clearWallPosts}
            totalCount={props.totalWallCount}
            profile={props.profile}
            wallPosts={props.wallPosts}
            pageSize={props.pageSizeWall}
            setCurrentPage={props.setWallCurrentPage}
            addNewPostThunk={props.addNewPostThunk}
            searchName={props.profile._id}
            currentPage={props.currentPageWall}
          />
        ) : selectedInfo === "Photos" ? (
          <div className="profileFooter__photos">
            <Photos
              profile={props.profile}
              profileOwner={props.profileOwner}
              photos={props.profilePhotos}
              request={props.getPhotos}
              clearProfilePhotos={props.clearProfilePhotos}
              totalCount={props.totalPhotosCount}
              pageSize={props.pageSizePhotos}
              setCurrentPage={props.setPhotosCurrentPage}
              searchName={props.profile._id}
              currentPage={props.currentPagePhotos}
              addNewPhotos={props.addNewPhotos}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileFooter;
