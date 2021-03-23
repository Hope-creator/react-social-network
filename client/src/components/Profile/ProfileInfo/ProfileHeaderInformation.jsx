import React, { useState } from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import profilePicture from '../../../img/profilePic.png';
import ProfileAbout from '../ProfileAbout/ProfileAbout';
import ProfileFriends from '../ProfileFriends/ProfileFriends';
import SendMessageForm from './SendMessageForm';




const ProfileHeaderInformation = (props) => {

    const [showModal, setShowModal] = useState(false);

    const changeShowModal = () => {
        setShowModal(!showModal)
    }




    if (!props.profile) return <Preloader />
    const newPhotoSelected = (e) => {
        props.savePhoto(e.target.files[0])
    }

    //props.profile.aboutMe
    return (<div className={s.profile_wrapper}>
        <div className={s.profileBlock}>
            <div className={s.profileHeaderBlock}>
                <div className={s.profilePictureUpdate}>
                    {props.profileOwner && <><input type='file' name='file' id='file' className={s.profileInputPhoto} onChange={newPhotoSelected} /><label htmlFor="file"><span>Change photo<span></span></span></label></>}
                    <img className={s.profile_picture} src={props.profile.profile.profilePicture || profilePicture} alt="profile__picture"/></div>
                <h3> {props.profile.name} </h3>
                {!props.profileOwner && <button className={s.messageBtn} onClick={()=> changeShowModal()}>Message</button>}
                {!props.profileOwner && showModal &&
                <SendMessageForm
                onMessageThunk={props.onMessageThunk}
                ownerId={props.ownerId}
                peerId={props.profile._id}
                peerPhoto={props.profile.profile.profilePicture || profilePicture}
                peerName={props.profile.name}
                changeShowModal={changeShowModal}
                />}
            </div>
            <div className={s.profileBodyBlock}></div>
            <div className={s.profileFooterBlock}>
                <ProfileStatusWithHooks profileOwner={props.profileOwner} status={props.profile.profile.status} updateStatus={props.updateStatus} />
            </div>
            <div className={s.profileInformation}>
                <div className={s.contactBlock}>
                    <div><span>Contacts</span> {props.profileOwner && <button onClick={() => props.setEditMode()} className={s.changeInfoBtn}><i className="fas fa-edit"></i></button>}
                    </div>
                    <ProfileContactData profile={props.profile} />
                </div>
                <div className={s.ProfileAboutBlock}>
                    <ProfileAbout profile={props.profile}
                        profileOwner={props.profileOwner}
                        setEditMode={props.setEditMode} />
                </div>
                <div className={s.ProfileFriendsBlock}>
                    <ProfileFriends profileOwner={props.profileOwner}
                        friends={props.friends} />
                </div>
            </div>
        </div>
    </div>
    )
}

const ProfileContactData = ({ profile }) => {
    return Object.entries(profile.profile.contacts).map((el) => { return <span className={s.contactItem} key={el[0]}>{el[0]}: <a href={'//' + el[1]} rel="noreferrer" target="_blank">{el[1]}</a></span> }) || null
}


export default ProfileHeaderInformation;