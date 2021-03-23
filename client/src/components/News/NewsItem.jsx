import React, { useState } from 'react';
import Preloader from '../common/preloader/Preloader';
import profilePicture from '../../img/profilePic.png'
import s from './News.module.css';
import { Link } from 'react-router-dom';



const NewsItem = ({ profile, propsDate, text, attachments }) => {
    let [fullScreen, setFullScreen] = useState(false);

    let [fullScreenImgSrc, setFullScreenImgSrc] = useState('');

    const changeFullScreen = () => {
        setFullScreen(!fullScreen);
    };

    const settingFullScreenImgSrc = (src) => {
        setFullScreenImgSrc(src)
    };

    if (!profile) return <Preloader />;
    const dateTS = Date.parse(propsDate)
    let date = new Date(+dateTS);
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
            break
        default: month = "January"
    };

    return <>
        <div className={s.newsItemPost}>
            <div className={s.newsItemHeader}>
                <Link to={`/profile/${profile._id}`} ><img className={s.newsItemHeaderPhoto} src={profile.profile.profilePicture || profilePicture} alt="profile__picture" /></Link>
                <div className={s.newsItemInfo}><Link to={`/profile/${profile._id}`} ><span>{profile.name}</span></Link>
                    <span>{`on ${day} ${month}, ${year}`}</span>
                </div>
            </div>
            <div className={s.newsitemContent}>
                <span className={s.newsTextObject}>{text}</span>
                <div className={s.newsObjects}>
                    {attachments && attachments.map((item, index, array) =>
                        item.type === "image" ?
                            <img onClick={() => {
                                changeFullScreen();
                                settingFullScreenImgSrc(item.url)
                            }} className={array.length === 1 ?
                                s.newsPhotoObject :
                                s.newsSmallObject} src={item.url} alt={`photo__${item.url}`} /> :
                            item.type === "video" ?
                                <video className={array.length === 1 ?
                                    s.newsVideoObject :
                                    s.newsSmallObject}
                                    src={item.url}
                                    alt={`video__${item.url}`} controls>
                                </video> :
                                null
                    )}
                </div>
            </div>
            {fullScreen ? <div className={s.modal} onClick={() => { changeFullScreen(); settingFullScreenImgSrc('') }}>
                <img src={fullScreenImgSrc} alt={'Some discription'} /></div>
                : null}
        </div>
    </>
}


export default NewsItem;