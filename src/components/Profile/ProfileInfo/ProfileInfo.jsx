import React, { useState } from 'react';
import Preloader from '../../common/preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import profilePicture from '../../../img/profilePic.png';


const ProfileInfo = (props) => {

    const newPhotoSelected = (e) => {
        props.savePhoto(e.target.files[0])
    }

    //props.profile.aboutMe
    return (<div className={s.profile_wrapper}>
        <div className={s.profileBlock}>
            <div className={s.profileHeaderBlock}>
                <div className={s.profilePictureUpdate}>
                    {props.profileOwner && <><input type='file' name='file' id='file' className={s.profileInputPhoto} onChange={newPhotoSelected} /><label for="file"><span>Change photo<span></span></span></label></>}
                    <img className={s.profile_picture} src={props.profile.photos.large || profilePicture} /></div>
                <h3> {props.profile.fullName} </h3>
            </div>
            <div className={s.profileBodyBlock}></div>
            <div className={s.profileFooterBlock}>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            </div>
            <div className={s.contactBlock}>
                <div><span>Contacts</span> {props.profileOwner && <button onClick={() => props.setEditMode()} className={s.changeInfoBtn}></button>}</div>
                <ProfileContactData profile={props.profile} />
            </div>
        </div>
    </div>
    )
}

const ProfileContactData = ({ profile }) => {
    return Object.entries(profile.contacts).map((el) => { return <span key={el[0]}>{el[0]}: <a href={'//' + el[1]} target="_blank">{el[1]}</a></span> }) || null
}


export default ProfileInfo;