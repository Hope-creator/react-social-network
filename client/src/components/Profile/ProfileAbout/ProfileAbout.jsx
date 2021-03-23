import React from 'react';
import s from './ProfileAbout.module.css';

const ProfileAbout = (props) => {

    return (
        <>
            <div className={s.aboutBlockHeader}><span>About</span> {props.profileOwner && <button onClick={() => props.setEditMode()} className={s.changeInfoBtn}><i className="fas fa-edit"></i></button>}</div>
            <div className={s.aboutBlockContent}>
                <ul className={s.aboutWrapContent}>
                    <li><div className={s.aboutContent}>
                        <span>Name:</span>
                        <span>{props.profile.name}</span>
                    </div>
                    </li>
                    {props.profile.profile.lookingForAJob ? <li><div className={s.aboutContent}>
                        <span>Looking for a job: </span>
                        <span>{props.profile.profile.lookingForAJobDescription}</span>
                    </div>
                    </li>
                    : null}
                    <li><div className={s.aboutContent}>
                        <span>About me:</span>
                       <span>{props.profile.profile.aboutMe}</span>
                    </div>
                    </li>
                </ul>
            </div>
        </>
    )
}


export default ProfileAbout;