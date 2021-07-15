import React, { useEffect } from "react";
import Post from "../../../../components/Post";
import AddPostForm from "../../../../components/AddPostForm/AddPostForm";
import { withGetOnScroll } from "../../../../hoc/withGetOnScroll";
import { CancelTokens } from "../../../../api/api";
import NoContentBlock from "../../../../components/NoContentBlock";

import "./Wall.scss";

const Wall = ({
  profileOwner,
  request,
  clearWallPosts,
  profile,
  wallPosts,
  pageSize,
  setCurrentPage,
  addNewPostThunk,
  getOnScroll,
}) => {
  useEffect(() => {
    request(1, pageSize, profile._id);
    getOnScroll();
    return function cleanUp() {
      CancelTokens.postsCancel("Fetch cancelled by user");
      clearWallPosts();
      setCurrentPage(1);
      window.onscroll = null;
    };
  }, [
    profile._id,
    request,
    clearWallPosts,
    getOnScroll,
    setCurrentPage,
    pageSize,
  ]);

  return (
    <div className="wall">
      {profileOwner && (
        <>
          <div className="wall__form">
            <p>What's new</p>
          </div>
          <AddPostForm onCreatePostHandler={addNewPostThunk} />
        </>
      )}
      {wallPosts.length > 0 ? (
        <div className="wall__posts">
          {wallPosts.map((post) => (
            <Post key={post._id} profile={profile} post={post} />
          ))}
        </div>
      ) : (
        <NoContentBlock icon={<i className="far fa-sticky-note"></i>}>
          Wall is empty
        </NoContentBlock>
      )}
    </div>
  );
};

export default withGetOnScroll(Wall);
