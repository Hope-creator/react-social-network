import React, { useEffect, useState } from 'react';
import Preloader from '../common/preloader/Preloader';
import profilePicture from '../../img/profilePic.png'
import s from './News.module.css';
import { Link } from 'react-router-dom';
import { ImageGroup, Image } from 'react-fullscreen-image'



const NewsItem = ({ type, profilePic, profile, propsDate, text, attachments }) => {

    if (!profile) return <Preloader />;

    let date = new Date(+propsDate);

    let day = date.getDate(), month, year = date.getFullYear();

    switch (date.getMonth()) {
        case 0: month = "January"
            break
        case 1: month = "February"
            break
        case 2: month = "March"
            break
        case 3: month = "April"
            break
        case 4: month = "May"
            break
        case 5: month = "June"
            break
        case 6: month = "July"
            break
        case 7: month = "August"
            break
        case 8: month = "September"
            break
        case 9: month = "October"
            break
        case 10: month = "November"
            break
        case 11: month = "December"
    }

    return <>
        <div className={s.newsItemPost}>
            <div className={s.newsItemHeader}>
                <Link to={`/profile/${profile.userId}`} ><img className={s.newsItemHeaderPhoto} src={profile.photos.small || profilePicture} alt="profilePicture" /></Link>
                <div className={s.newsItemInfo}><Link to={`/profile/${profile.userId}`} ><span>{profile.fullName}</span></Link>
                    <span>{`on ${day} ${month}, ${year}`}</span>
                </div>
            </div>
            <div className={s.newsitemContent}>
                
                <span className={s.newsTextObject}>{text}</span>
                <div className={s.newsObjects}>
                    {attachments && attachments.map((item, index, array) =>
                item.type == "photo" ?
                <img id={item.id} className={array.length == 1 ? s.newsPhotoObject : s.newsSmallObject} src={item.url} alt={`photo__${item.id}`}  /> : 
                item.type == "video" ?
                <video id={item.id} className={array.length == 1 ? s.newsVideoObject : s.newsSmallObject} src={item.url} alt={`video__${item.id}`} controls></video> :
                null
                 ) }
                 </div>
            </div>
        </div>
    </>
}


export default NewsItem;