import React from 'react';
import ProfileFooterInformationContainer from './ProfileFooterInformation/ProfileFooterInformationContainer';
import { connect } from 'react-redux';
import {
    clearProfilePhotos, setPhotosCurrentPage,
    getPhotos, addNewPhotosThunk,
    addNewPostThunk, clearProfile,
    clearWallPosts, getProfile,
    updateStatus, savePhoto,
    updateProfile, getFriends,
    getPosts, setWallCurrentPage,
    setWallCount, setPhotoslCount
} from '../../redux/profile-reducer';
import {onMessageThunk} from '../../redux/dialogs-reducer'
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import ProfileContactForm from './ProfileInfo/ProfileChangeForm';
import ProfileHeaderInformation from './ProfileInfo/ProfileHeaderInformation';
import NoMatch from '../common/NoMatch/NoMatch';


class ProfileContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { editMode: false , profileOwner: false}
    }


    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.id
        }
        this.props.getProfile(userId).then(res=>{
            if(res !== undefined) this.setState({error: true})
        });
        this.props.getFriends(userId);
        this.props.setWallCount(null);
        this.props.setPhotoslCount(null);
    }

    setEditMode() {
        this.setState({ editMode: !this.state.editMode })
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
            this.setState({error: false})
            this.refreshProfile();
        }
        if (this.props.profile !== prevProps.profile) this.isProfileOwner()
    }

    isProfileOwner = () => {
        if(this.props.id && this.props.profile) {
            return this.props.id === this.props.profile._id ?
            this.setState({profileOwner: true}) :
            this.setState({profileOwner: false})
        }
    }
    


    render() {

        if(this.state.error) return <NoMatch />

        return (!this.props.match.params.userId && !this.props.isAuth
            ? <Redirect to="/login" />
            : this.state.editMode ?
                <ProfileContactForm
                    profile={this.props.profile}
                    setEditMode={this.setEditMode.bind(this)}
                    updateProfile={this.props.updateProfile}
                />
                : <>
                    <ProfileHeaderInformation {...this.props}
                        profile={this.props.profile}
                        updateStatus={this.props.updateStatus}
                        profileOwner={this.state.profileOwner}
                        savePhoto={this.props.savePhoto}
                        setEditMode={this.setEditMode.bind(this)}
                        updateProfile={this.props.updateProfile}
                        ownerId={this.props.id}
                        onMessageThunk={this.props.onMessageThunk}
                    />
                    <ProfileFooterInformationContainer {...this.props}
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
                    /></>)
    }
}

// searchName is filler to Hoc, its like id of the profile

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        id: state.auth.id,
        isAuth: state.auth.isAuth,
        friends: state.profilePage.randomFriends,
        currentPageWall: state.profilePage.currentPageWall,
        currentPagePhotos: state.profilePage.currentPagePhotos,
        pageSizeWall: state.profilePage.pageSizeWall,
        pageSizePhotos: state.profilePage.pageSizePhotos,
        totalWallCount: state.profilePage.totalWallCount,
        totalPhotosCount: state.profilePage.totalPhotosCount,
        wallPosts: state.profilePage.wallPosts,
        profilePhotos: state.profilePage.profilePhotos
    }
}

let mapDistpatchToProps = {
    getProfile, updateStatus,
    savePhoto, updateProfile,
    getFriends, getPosts, getPhotos,
    setWallCurrentPage, setPhotosCurrentPage,
    clearWallPosts, clearProfilePhotos, clearProfile,
    addNewPostThunk, addNewPhotosThunk, onMessageThunk,
    setWallCount, setPhotoslCount
}

export default compose(
    connect(mapStateToProps, mapDistpatchToProps),
    withRouter,

)(ProfileContainer);