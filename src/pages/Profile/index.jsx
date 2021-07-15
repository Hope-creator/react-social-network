import React from "react";
import ProfileFooter from "./containers/ProfileFooter";
import { connect } from "react-redux";
import {
  profileSelectors,
  profileThunks,
  profileActionCreators,
} from "../../modules/profile";
import { authSelectors } from "../../modules/auth";
import { dialogsThunks } from "../../modules/dialogs";
import { Redirect, withRouter } from "react-router-dom";
import { compose } from "redux";
import ProfileHeader from "./containers/ProfileHeader";
import NoMatch from "../../parts/NoMatch";
import ProfileInfoForm from "../../components/ProfileInfoForm";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false, profileOwner: false };
  }

  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.id;
    }
    this.props.getProfile(userId).then((res) => {
      if (res !== undefined) this.setState({ error: true });
    });
    this.props.getFriends(userId);
    this.props.setWallCount(null);
    this.props.setPhotoslCount(null);
  }

  setEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentWillUnmount() {
    this.props.clearProfile();
    this.props.setWallCount(null);
    this.props.setPhotoslCount(null);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.setState({ error: false });
      this.refreshProfile();
    }
    if (this.props.profile !== prevProps.profile) this.isProfileOwner();
  }

  isProfileOwner = () => {
    if (this.props.id && this.props.profile) {
      return this.props.id === this.props.profile._id
        ? this.setState({ profileOwner: true })
        : this.setState({ profileOwner: false });
    }
  };

  render() {
    if (this.state.error) return <NoMatch />;

    return !this.props.match.params.userId && !this.props.isAuth ? (
      <Redirect to="/login" />
    ) : this.state.editMode ? (
      <ProfileInfoForm
        profile={this.props.profile}
        setEditMode={this.setEditMode.bind(this)}
        updateProfile={this.props.updateProfile}
      />
    ) : (
      <>
        <ProfileHeader
          {...this.props}
          profile={this.props.profile}
          updateStatus={this.props.updateStatus}
          profileOwner={this.state.profileOwner}
          savePhoto={this.props.savePhoto}
          setEditMode={this.setEditMode.bind(this)}
          updateProfile={this.props.updateProfile}
          ownerId={this.props.id}
          onMessageThunk={this.props.onMessageThunk}
        />
        <ProfileFooter
          {...this.props}
          profile={this.props.profile}
          updateStatus={this.props.updateStatus}
          setEditMode={this.setEditMode.bind(this)}
          profileOwner={this.state.profileOwner}
          savePhoto={this.props.savePhoto}
          getOnScroll={this.props.getOnScroll}
          currentPageWall={this.props.currentPageWall}
          currentPagePhotos={this.props.currentPagePhotos}
          pageSizeWall={this.props.pageSizeWall}
          pageSizePhotos={this.props.pageSizePhotos}
          setWallCurrentPage={this.props.setWallCurrentPage}
          setPhotosCurrentPage={this.props.setPhotosCurrentPage}
          getPosts={this.props.getPosts}
          getPhotos={this.props.getPhotos}
          wallPosts={this.props.wallPosts}
          profilePhotos={this.props.profilePhotos}
          totalWallCount={this.props.totalWallCount}
          totalPhotosCount={this.props.totalPhotosCount}
          clearWallPosts={this.props.clearWallPosts}
          clearProfilePhotos={this.props.clearProfilePhotos}
          addNewPostThunk={this.props.addNewPostThunk}
          addNewPhotos={this.props.addNewPhotosThunk}
        />
      </>
    );
  }
}

// searchName is filler to Hoc, its like id of the profile

let mapStateToProps = (state) => {
  return {
    profile: profileSelectors.selectProfile(state),
    id: authSelectors.selectAuthId(state),
    isAuth: authSelectors.selectIsAuth(state),
    friends: profileSelectors.selectProfileRandomFriends(state),
    currentPageWall: profileSelectors.selectCurrentPageWall(state),
    currentPagePhotos: profileSelectors.selectCurrentPagePhotos(state),
    pageSizeWall: profileSelectors.selectPageSizeWall(state),
    pageSizePhotos: profileSelectors.selectPageSizePhotos(state),
    totalWallCount: profileSelectors.selectTotalWallCount(state),
    totalPhotosCount: profileSelectors.selectTotalPhotosCount(state),
    wallPosts: profileSelectors.selectWallPosts(state),
    profilePhotos: profileSelectors.selectProfilePhotos(state),
  };
};

let mapDistpatchToProps = {
  setWallCurrentPage: profileActionCreators.setWallCurrentPage,
  setPhotosCurrentPage: profileActionCreators.setPhotosCurrentPage,
  clearWallPosts: profileActionCreators.clearWallPosts,
  clearProfilePhotos: profileActionCreators.clearProfilePhotos,
  clearProfile: profileActionCreators.clearProfile,
  setWallCount: profileActionCreators.setWallCount,
  setPhotoslCount: profileActionCreators.setPhotoslCount,
  getProfile: profileThunks.getProfile,
  updateStatus: profileThunks.updateStatus,
  savePhoto: profileThunks.savePhoto,
  updateProfile: profileThunks.updateProfile,
  getFriends: profileThunks.getFriends,
  getPosts: profileThunks.getPosts,
  getPhotos: profileThunks.getPhotos,
  addNewPostThunk: profileThunks.addNewPostThunk,
  addNewPhotosThunk: profileThunks.addNewPhotosThunk,
  onMessageThunk: dialogsThunks.onMessageThunk,
};

export default compose(
  connect(mapStateToProps, mapDistpatchToProps),
  withRouter
)(Profile);
