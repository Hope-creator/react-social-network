import React from 'react';
import Preloader from '../../common/preloader/Preloader';
import profilePicture from '../../../img/profilePic.png';
import s from './ProfileFriends.module.css';
import { Link, NavLink } from 'react-router-dom';
const ProfileFriends = (props) => {

    if (!props.friends) return <Preloader />;
    let friendsItems;
    if (props.friends) {
        friendsItems = props.friends.map(f =>{
            return <li key={f._id}>
                <Link to={`/profile/${f._id}`}>
                    <img src={f.profile.profilePicture ? f.profile.profilePicture : profilePicture} alt={`${f.id}`} />
                    <span>
                        {f.name}
                    </span>
                </Link>
            </li>
            })
    };


    return (<>
        <div className={s.friendsBlockHeader}><span>Friends</span> {props.profileOwner && <NavLink to="/users" className={s.addFriendsLink}>Add <i className="fas fa-plus"></i></NavLink>}</div>
        <div className={s.friendsBlockContent}>
            <ul className={s.friendsGrid}>
                {friendsItems}
            </ul>
        </div>
    </>
    )
}


export default ProfileFriends;