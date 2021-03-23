import React from 'react';
import s from './Friends.module.css';
import profilePicture from '../../img/profilePic.png';
import { NavLink } from 'react-router-dom';
import Preloader from '../common/preloader/Preloader';

let Friend = (props) => {
    if(!props.friends) return <Preloader/>
    return (<>
        
        <div >
            {props.friends.map((u, i, array) => <div key={u._id} className={s.usersItem}>
                <div className={s.itemLeft}><NavLink to={"/profile/" + u._id}>
                        <img className={s.profilePic} src={u.profile.profilePicture != null ? u.profile.profilePicture : profilePicture} alt="profile__picture"/>
                    </NavLink></div>
                <div className={s.itemRight}>
                    <div className={s.mediaHeader}>
                    
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
                    <button disabled={props.followingInProgress.some(id => id === u._id)}
                        onClick={() => { props.unFollow(u._id) }
                        }>Unfollow</button>
                </div>
            </div></div>
                )}
        </div>
    </>
    )
}



export default Friend;