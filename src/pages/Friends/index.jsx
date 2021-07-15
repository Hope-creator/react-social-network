import React from "react";
import { connect } from "react-redux";
import Preloader from "../../parts/preloader";
import {
  friendsSelectors,
  friendsActionCreators,
  friendsThunks,
} from "../../modules/friends";
import { authSelectors } from "../../modules/auth";
import { withGetOnScroll } from "../../hoc/withGetOnScroll";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { CancelTokens } from "../../api/api";
import UserItem from "../../components/UserItem";
import SearchUserForm from "../../components/SearchUserForm";

import "./Friends.scss";

class FriendsContainer extends React.Component {
  componentDidMount() {
    this.props.request(1, this.props.pageSize, "", this.props.ownerId);
    this.props.getOnScroll();
  }

  componentDidUpdate(prevState) {
    if (this.props.searchName !== prevState.searchName) {
      this.props.clearFriends();
      this.props.request(
        1,
        this.props.pageSize,
        this.props.searchName,
        this.props.ownerId
      );
      window.onscroll = null;
      this.props.getOnScroll();
    }
  }

  componentWillUnmount() {
    this.props.clearAllFriendsState();
    window.onscroll = null;
    CancelTokens.usersCancel("Fetch aborted by user");
  }

  onPageChange = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.request(
      pageNumber,
      this.props.pageSize,
      this.props.searchName,
      this.props.ownerId
    );
  };

  unfollow = (id) => {
    this.props.unfollowThunk(id);
  };

  render() {
    return (
      <>
        {this.props.isFetchingFriends ? <Preloader /> : null}
        {!(this.props.isFetchingFriends && this.props.friends.length === 0) && (
          <div>
            <div className="friends__form">
              <SearchUserForm
                submitHandler={this.props.setSearchFriendsName}
                placeholder="Name"
                withButton
              />
            </div>
            <div className="friends__friendsContainer">
              {this.props.friends.map((friend) => (
                <UserItem
                  key={friend._id}
                  user={friend}
                  ownerId={this.props.ownerId}
                  followingInProgress={this.props.followingInProgress}
                  unfollow={this.unfollow}
                />
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}

const Friends = withGetOnScroll(FriendsContainer);

let mapStateToProps = (state) => {
  return {
    friends: friendsSelectors.selectFriends(state),
    pageSize: friendsSelectors.selectPageSizeFriends(state),
    totalCount: friendsSelectors.selectTotalFriendsCount(state),
    currentPage: friendsSelectors.selectCurrentFriendsPage(state),
    isFetching: friendsSelectors.selectIsFetchingFriends(state),
    followingInProgress:
      friendsSelectors.selectFollowingInProgressFriends(state),
    searchName: friendsSelectors.selectSearchFriendsName(state),
    isFetchingFriends: friendsSelectors.selectIsFetchingFriends(state),
    ownerId: authSelectors.selectAuthId(state),
  };
};

let mapDispatchToProps = {
  setFriendsCount: friendsActionCreators.setFriendsCount,
  setCurrentPage: friendsActionCreators.setCurrentPage,
  toggleFollowingProgress: friendsActionCreators.toggleFollowingProgress,
  clearFriends: friendsActionCreators.clearFriends,
  setSearchFriendsName: friendsActionCreators.setSearchFriendsName,
  clearAllFriendsState: friendsActionCreators.clearAllFriendsState,
  unfollowThunk: friendsThunks.unfollowThunk,
  request: friendsThunks.requestFriends,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Friends);
