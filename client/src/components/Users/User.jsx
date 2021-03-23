import React from 'react';
import s from './Users.module.css';
import profilePicture from '../../img/profilePic.png';
import { NavLink } from 'react-router-dom';

let User = (props) => {

    return (<>
        
        <div className={s.flexWrapper}>
            {props.users.map((u, i, array) => <div key={u._id} className={s.usersItem}>
                <div className={s.mediaHeader}>
                    <NavLink to={"/profile/" + u._id}>
                        <img className={s.profilePic} src={u.profile.profilePicture != null ? u.profile.profilePicture : profilePicture} alt="profile__picture"/>
                    </NavLink>
                    <div className={s.mediaHeaderBody}> <h4>{u.name}</h4>
                        <span><i className="fas fa-users"></i> {u.followers.length}</span>
                        <span><i className="fas fa-camera"></i> 0 </span>
                        <span><i className="fas fa-video"></i> 0 </span> </div>
                </div>
                <div className={s.mediaBody}>
                    <span>Status</span>
                    <div>
                        <span key={u._id}> {u.profile.status != null ? u.profile.status : 'Status is not taken by '} </span>
                    </div>
                </div>
                <div className={s.mediaFooter}>
                    {u.followers.includes(props.ownerId) && u._id !== props.ownerId 
                        ? <button disabled={props.followingInProgress.some(id => id === u._id)} 
                        onClick={() => { props.unfollow(u._id) }}>Unfollow</button>
                        : u._id === props.ownerId ? null 
                        :<button disabled={props.followingInProgress.some(id => id === u._id)}
                            onClick={() => { props.follow(u._id) }}>Follow</button>}
                </div>
            </div>)}
        </div>
    </>
    )
}



export default User;