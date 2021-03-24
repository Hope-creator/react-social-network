import React, { useEffect, useState } from "react";
import s from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {
    //hooks
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    let [isHidden] = useState(false);

    useEffect(()=> {
        setStatus(props.status)
    },[props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    const statusMarkup = () => {
        if (props.profileOwner) return props.status ? <span className={s.profileStatus}>{props.status}</span> : <div className={s.profileChangeStatus}>Change status</div>
        else {
            return props.status ? <span className={s.profileStatus}>{props.status}</span> : null
        }
    }

    return (<div className={isHidden ? s.hidden + ' ' + s.profileStatusBlock : s.profileStatusBlock}>
        <div>{!editMode &&
                <span onClick={activateEditMode}>
                    {statusMarkup()}
                    </span> }
        {editMode &&
                <input value={status} onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}/>
        }
        </div>
    </div>
    )
}

export default ProfileStatusWithHooks;