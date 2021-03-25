import React from 'react';
import Preloader from '../common/preloader/Preloader';
import s from './News.module.css';
import { Link, NavLink } from 'react-router-dom';
import NewsItem from './NewsItem';
import NoNews from './NoNews';
import profilePicture from '../../img/profilePic.png';


const News = (props) => {
    if (!props.profile) return <Preloader />;
    let newsContent = props.newsItems.map(item =>{
        return <div key={item._id} className={s.newsContentItem}>
            <NewsItem
                id={item._id}
                propsDate={item.ts}
                profile={props.newsProfiles.find(profile => profile._id === item.by._id)}
                text={item.detail.text}
                type={item.type}
                attachments={item.detail.attachments}
            />
        </div>
        })
    
    return (
        <div>
            <div className={s.newsHeader}>
                <div className={s.newsHeaderLeftSide}>
                    <img className={s.newsHeaderPhoto} src={props.profile.profile.profilePicture || profilePicture} alt="profile__photo" />
                    <div className={s.newsHeaderInfo}>
                        <Link to="/profile"><h2>{props.profile.name}</h2></Link>
                        <div className={s.newsHeaderNavbar}>
                            <NavLink activeClassName={s.activeLink} to="/news"><i className="far fa-newspaper"></i> Timeline </NavLink>
                            <NavLink to="/profile"><i className="far fa-user-circle"></i> About</NavLink>
                            <NavLink to="/friends"><i className="fas fa-users"></i> Friends </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.newsContent}>
                {newsContent.length > 0 ?
                newsContent :
                <NoNews />}
            </div>
        </div>
    )
}


export default News;