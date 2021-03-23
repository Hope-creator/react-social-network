import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import ProfilePhotosBlock from './ProfilePhotos/ProfilePhotosContainer';
import ProfileAbout from './ProfileAbout/ProfileAbout';
import ProfileFriends from './ProfileFriends/ProfileFriends';
import Preloader from '../common/preloader/Preloader';

window.props = [];
const Profile = (props) => {

    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div className={s.content}>
            <div className={s.profileInfo}><ProfileInfo profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                profileOwner={props.profileOwner}
                savePhoto={props.savePhoto}
                setEditMode={props.setEditMode}
                updateProfile={props.updateProfile}
            /></div>
            <div className={s.profileSideContent}>
                <div className={s.ProfilePhotosBlock}><ProfilePhotosBlock /></div>
                <div className={s.FlexBlockWrapper}><div className={s.ProfileAboutBlock}><ProfileAbout
                    profile={props.profile}
                    profileOwner={props.profileOwner}
                    setEditMode={props.setEditMode}
                /></div>
                    <div className={s.ProfileFriendsBlock}><ProfileFriends
                        profileOwner={props.profileOwner}
                        friends={props.friends}
                    /></div>
                </div>
            </div>
        </div>
    )
}

export default Profile;