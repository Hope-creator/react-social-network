import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './DialogsItem.module.css';

const DialogItem = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={"/dialogs/" + props.id} activeClassName={s.active}>
                <div className={s.dialog_media}>
                    <img src={props.media_src} alt="pic" className={s.media_object} />
                    <div className={s.media_info}>{props.name}</div>
                </div>
            </NavLink>
        </div>
    )
}

export default DialogItem;