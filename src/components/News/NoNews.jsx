import React from 'react';
import s from './News.module.css';


let NoNews = () => {
    return <div className={s.noNewsWrapper}>
        <div className={s.noNewsBody}>
            <i class="far fa-newspaper"></i>
            <div>Don't have any news or you don't follow any people</div>
            </div>
    </div>
}




export default NoNews;