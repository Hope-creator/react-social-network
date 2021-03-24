import React from 'react';
import s from './Wall.module.css';


let NoPost = () => {

    return <div className={s.noPostWrapper}>
        <div className={s.noPostBody}>
            <i className="far fa-sticky-note"></i>
            <div>Wall is empty</div>
            </div>
    </div>
}




export default NoPost;