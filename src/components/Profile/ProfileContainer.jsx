import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfile, getStatus, updateStatus, savePhoto, updateProfile, getFriends } from '../../redux/profile-reducer'
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import ProfileContactForm from './ProfileInfo/ProfileChangeForm';


class ProfileContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {editMode: false}
    }


    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.id
        }
        this.props.getProfile(userId);
        this.props.getStatus(userId);
        this.props.getFriends();
    }

    setEditMode() {
        this.setState({editMode: !this.state.editMode})
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prepProps,prevState) {
        if (this.props.match.params.userId != prepProps.match.params.userId) this.refreshProfile();
    }

    render() {
        return (!this.props.match.params.userId && !this.props.isAuth 
        ? <Redirect to="/login" /> 
        : this.state.editMode ?
        <ProfileContactForm 
        profile={this.props.profile}
        setEditMode={this.setEditMode.bind(this)}
        updateProfile={this.props.updateProfile}
        />
        :
        <Profile {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        setEditMode={this.setEditMode.bind(this)}
        profileOwner = {!this.props.match.params.userId}
        savePhoto={this.props.savePhoto}
        setEditMode={this.setEditMode.bind(this)}
        friends={this.props.friends}
         />)
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        id: state.auth.id,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        friends: state.profilePage.friends
    }
}

let mapDistpatchToProps = { getProfile, getStatus, updateStatus, savePhoto, updateProfile, getFriends }

export default compose(
    connect(mapStateToProps, mapDistpatchToProps),
    withRouter,
)(ProfileContainer);