import React, { useEffect, useState } from "react";
import s from './ProfileStatus.module.css';

const ProfileStatusWithHooks = (props) => {
    //hooks
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    let [isHidden, setHidden] = useState(false);

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

    const isHiddenChange =() => {
        setHidden(!isHidden)
    }

    return (<div className={isHidden ? s.hidden + ' ' + s.profileStatusBlock : s.profileStatusBlock}>
        <div>{!editMode &&
                <span onDoubleClick={activateEditMode}>{props.status || '--------'}</span>
        }
        {editMode &&
                <input value={status} onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}/>
        }
        <div onClick={()=>isHiddenChange()} className={s.profileStatusShowBlock} ></div>
        </div>
    </div>
    )
}

export default ProfileStatusWithHooks;