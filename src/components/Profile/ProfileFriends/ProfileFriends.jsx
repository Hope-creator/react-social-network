import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import profilePicture from '../../../img/profilePic.png';
import s from './ProfileFriends.module.css';
import { Link } from 'react-router-dom';
const ProfilePhotos = (props) => {

    if (!props.friends) return <Preloader />;
    let friendsItems;
    if (props.friends) {
        friendsItems = props.friends.map(f =>{
        if (f){
            return <li key={f.id}>
                <Link to={`/profile/${f.id}`}>
                    <img src={f.photos.small ? f.photos.small : profilePicture} alt={`Photo${f.id}`} />
                    <span>
                        {f.name}
                    </span>
                </Link>
            </li>}
            })
    };

    return (<>
        <div className={s.friendsBlockHeader}><span>Friends</span> {props.profileOwner && <button onClick={() => props.setEditMode()} className={s.addFriendsBtn}></button>}</div>
        <div className={s.friendsBlockContent}>
            <ul className={s.friendsGrid}>
                {friendsItems}
            </ul>
        </div>
    </>
    )
}


export default ProfilePhotos;