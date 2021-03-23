import * as Axios from 'axios';
import React from 'react';
import s from './Users.module.css';
import profilePicture from '../../img/profilePic.png'

const UsersOld = (props) => {

    let getUsers = function () {
        if (props.users.length == 0) {
            (async () => {
                try {
                    const response = await Axios.get('https://social-network.samuraijs.com/api/1.0/users');
                    props.setUsers(response.data.items)
                }
                catch (error) {
                    throw error
                }
            })()
        }
    }

    return <div className={s.flexWrapper}> <button onClick={getUsers}>get users</button>
            {props.users.map((u, i, array) => <div key={u.id} className={s.usersItem}>
                <div className={s.mediaHeader}>
                    <img className={s.profilePic} src={u.photos.small != null ? u.photos.small : profilePicture} />
                    <div className={s.mediaHeaderBody}> <h4>{u.fullName}</h4>
                        <span>F: {array.length}</span>
                        <span>P: 0 </span>
                        <span>V: 0 </span> </div>
                </div>
                <div className={s.mediaBody}>
                    <span>Status</span>
                    <div>
                        <span key={u.id}> {u.status != null ? u.status : 'Status is not taken by '} </span>
                    </div>
                </div>
                <div className={s.mediaFooter}>
                    {u.isFollowed ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button> : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
                </div>
            </div>)}
    </div>
}

export default UsersOld;