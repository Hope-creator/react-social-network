import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import NewsItem from "../../components/NewsItem";
import NoContentBlock from "../../components/NoContentBlock";
import Avatar from "../../components/Avatar";
import {
  newsSelectors,
  newsThunks,
  newsActionCreators,
} from "../../modules/news";
import { authSelectors } from "../../modules/auth";
import Preloader from "../../parts/preloader";
import { withGetOnScroll } from "../../hoc/withGetOnScroll";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { CancelTokens } from "../../api/api";

import "./News.scss";

const NewsContainer = ({
  profile,
  userId,
  newsItems,
  newsUsersProfiles,
  pageSize,
  getProfile,
  getNewsProfiles,
  setCurrentPage,
  clearNews,
  clearNewsProfiles,
  request,
  getOnScroll,
}) => {
  const [newsProfiles, setNewsProfiles] = useState([]);
  const [fetchingProfiles, setFetchingProfiles] = useState(false);

  useEffect(() => {
    newsItems.forEach((item) => {
      if (!newsProfiles.includes(item.by._id)) {
        setNewsProfiles([...newsProfiles, item.by._id]);
      }
    });
  }, [newsItems, newsProfiles]);

  useEffect(() => {
    getProfile(userId);
  }, [userId, getProfile]);

  useEffect(() => {
    newsProfiles.forEach((id) => {
      if (
        !newsUsersProfiles.find((profile) => id === profile._id) &&
        !fetchingProfiles
      ) {
        setFetchingProfiles(true);
        getNewsProfiles(id).then((res) => {
          if (res) setFetchingProfiles(false);
        });
      }
    });
  }, [fetchingProfiles, newsProfiles, getNewsProfiles, newsUsersProfiles]);

  useEffect(() => {
    request(1, pageSize);
    getOnScroll();
    return function cleanUp() {
      CancelTokens.newsCancel("Fetch canceled by user");
      clearNews();
      clearNewsProfiles();
      setCurrentPage(1);
    };
  }, [
    clearNews,
    clearNewsProfiles,
    getOnScroll,
    pageSize,
    request,
    setCurrentPage,
  ]);

  return !profile ? (
    <Preloader />
  ) : (
    <div className="news">
      <div className="news__header">
        <Avatar
          className="news__header-avatar"
          src={profile.profile.profilePicture}
        />
        <div className="news__header-info">
          <Link to="/profile">
            <h2>{profile.name}</h2>
          </Link>
          <div>
            <NavLink
              className="news__header-link"
              activeClassName="news__header-link_active"
              to="/news"
            >
              <i className="far fa-newspaper"></i> Timeline{" "}
            </NavLink>
            <NavLink className="news__header-link" to="/profile">
              <i className="far fa-user-circle"></i> About
            </NavLink>
            <NavLink className="news__header-link" to="/friends">
              <i className="fas fa-users"></i> Friends{" "}
            </NavLink>
          </div>
        </div>
      </div>
      <div className="news__content">
        {newsItems.length > 0 ? (
          newsItems.map((item) => (
            <div key={item._id} className="news__content-item">
              <NewsItem
                date={item.ts}
                profile={newsUsersProfiles.find(
                  (profile) => profile._id === item.by._id
                )}
                text={item.detail.text}
                attachments={item.detail.attachments}
              />
            </div>
          ))
        ) : (
          <NoContentBlock icon={<i className="far fa-newspaper"></i>}>
            Don't have any news or you don't follow any people
          </NoContentBlock>
        )}
      </div>
    </div>
  );
};

const News = withGetOnScroll(NewsContainer);

let mapStateToProps = (state) => {
  return {
    profile: newsSelectors.selectProfileNews(state),
    userId: authSelectors.selectAuthId(state),
    newsItems: newsSelectors.selectNewsItems(state),
    newsUsersProfiles: newsSelectors.selectNewsUsersProfiles(state),
    currentPage: newsSelectors.selectCurrentPageNews(state),
    pageSize: newsSelectors.selectPageSizeNews(state),
    totalCount: newsSelectors.selectTotalCountNews(state),
  };
};

const mapDispatchToProps = {
  setCurrentPage: newsActionCreators.setCurrentPageNews,
  clearNews: newsActionCreators.clearNews,
  clearNewsProfiles: newsActionCreators.clearNewsProfiles,
  request: newsThunks.getNews,
  getProfile: newsThunks.getProfile,
  getNewsProfiles: newsThunks.getNewsProfiles,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(News);
