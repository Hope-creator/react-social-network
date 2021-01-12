import React from 'react';
import s from './Friends.module.css';
import profilePicture from '../../img/profilePic.png';
import { NavLink } from 'react-router-dom';
import Preloader from '../common/preloader/Preloader';

let Friend = (props) => {

    return (<>
        
        <div >
            {props.friends.map((u, i, array) => <div key={u.id} className={s.usersItem}>
                <div className={s.itemLeft}><NavLink to={"/profile/" + u.id}>
                        <img className={s.profilePic} src={u.photos.small != null ? u.photos.small : profilePicture} />
                    </NavLink></div>
                <div className={s.itemRight}>
                    <div className={s.mediaHeader}>
                    
                    <div className={s.mediaHeaderBody}> <h4>{u.name}</h4>
                        <span><i class="fas fa-users"></i> {array.length}</span>
                        <span><i class="fas fa-camera"></i> 0 </span>
                        <span><i class="fas fa-video"></i> 0 </span> </div>
                </div>
                <div className={s.mediaBody}>
                    <span>Status</span>
                    <div>
                        <span key={u.id}> {u.status != null ? u.status : 'Status is not taken by '} </span>
                    </div>
                </div>
                <div className={s.mediaFooter}>
                    {u.followed && <button disabled={props.followingInProgress.some(id => id === u.id)}
                        onClick={() => { props.unFollow(u.id) }
                        }>Unfollow</button>}
                </div>
            </div></div>
                )}
        </div>
    </>
    )
}



export default Friend;