import React from "react";
import { connect } from "react-redux";
import {
  usersSelectors,
  usersThunks,
  usersActionCreators,
} from "../../modules/users";
import { authSelectors } from "../../modules/auth";
import Preloader from "../../parts/preloader";
import { withGetOnScroll } from "../../hoc/withGetOnScroll";
import { CancelTokens } from "../../api/api";
import UserItem from "../../components/UserItem";
import SearchUserForm from "../../components/SearchUserForm";

import "./Users.scss";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.users.length === 0 &&
      this.props.request(1, this.props.pageSize, this.props.searchName);
    this.props.getOnScroll();
  }

  componentDidUpdate(prevState) {
    if (this.props.searchName !== prevState.searchName) {
      this.props.clearUsers();
      this.props.request(1, this.props.pageSize, this.props.searchName);
      window.onscroll = null;
      this.props.getOnScroll();
    }
  }

  componentWillUnmount() {
    CancelTokens.usersCancel();
    this.props.clearUsers();
    window.onscroll = null;
    this.props.setSearchUsersName("");
    this.props.setCurrentPage(1);
  }

  follow = (id) => {
    this.props.followUnfollowThunk(id, this.props.ownerId, "follow");
  };

  unfollow = (id) => {
    this.props.followUnfollowThunk(id, this.props.ownerId, "unfollow");
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <div>
          <div className="users__form">
            <SearchUserForm
              searchName={this.props.searchName}
              submitHandler={this.props.setSearchUsersName}
              withButton
            />
          </div>
          <div className="users__flexContainer">
            {this.props.users.map((user) => (
              <UserItem
                key={user._id}
                className="users__item"
                user={user}
                followingInProgress={this.props.followingInProgress}
                unfollow={this.unfollow}
                follow={this.follow}
                ownerId={this.props.ownerId}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

const UsersContainerWithScroll = withGetOnScroll(UsersContainer);

let mapStateToProps = (state) => {
  return {
    users: usersSelectors.selectUsers(state),
    pageSize: usersSelectors.selectPageSizeUsers(state),
    totalCount: usersSelectors.selectTotalCountUsers(state),
    currentPage: usersSelectors.selectCurrentPageUsers(state),
    isFetching: usersSelectors.selectIsFetchingUsers(state),
    followingInProgress: usersSelectors.selectFollowingInProgress(state),
    searchName: usersSelectors.selectSearchUsersName(state),
    ownerId: authSelectors.selectAuthId(state),
  };
};

let mapDispatchToProps = {
  followUnfollowThunk: usersThunks.followUnfollowThunk,
  setUsersCount: usersActionCreators.setUsersCount,
  setCurrentPage: usersActionCreators.setCurrentPage,
  toggleFollowingProgress: usersActionCreators.toggleFollowingProgress,
  request: usersThunks.requestUsers,
  clearUsers: usersActionCreators.clearUsers,
  setSearchUsersName: usersActionCreators.setSearchUsersName,
};

const Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainerWithScroll);

export default Users;
