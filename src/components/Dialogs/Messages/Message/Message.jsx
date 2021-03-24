import React from 'react';
import { Link } from 'react-router-dom';
import s from './Message.module.css';
import profilePicture from '../../../../img/profilePic.png'

const Message = ({message, ownerProfile, peerProfile}) => {

    let date = new Date(message.ts);

    let minutes = date.getMinutes();
    if (minutes > -1 && minutes <10) minutes = "0" + minutes;
    let day= date.getDate(), month, year = date.getFullYear(), time = date.getHours() + ":" + minutes;
    
    switch(date.getMonth()) {
        case 0 : month = "January"
        break
        case 1 : month = "February"
        break
        case 2 : month = "March" 
        break
        case 3 : month = "April" 
        break
        case 4 : month = "May" 
        break
        case 5 : month = "June" 
        break
        case 6 : month = "July" 
        break
        case 7 : month ="August" 
        break
        case 8 : month = "September" 
        break
        case 9 : month = "October" 
        break
        case 10 : month = "November" 
        break
        case 11 : month = "December"
        break
        
        default: month = "January"
    }

    if (!message || !peerProfile) return <div>loading...</div>

    return (
        <div className={ message.fromId === ownerProfile._id ? s.messageReverse : s.message}>
            <div className={s.messageLeft}>
                <img src={message.fromId === ownerProfile._id ?
            ownerProfile.profile.profilePicture ?? profilePicture :
            peerProfile.profile.profilePicture ?? profilePicture} alt="profilePhoto" className={s.messagePhoto} /></div>
            <div className={s.messageRight}>
                <div className={message.fromId === ownerProfile._id ? s.messageHeaderReversed : s.messageHeader }>
                    <span><Link to={message.fromId === ownerProfile._id ?
                    `/profile/${ownerProfile._id}` : `/profile/${peerProfile._id}`}>
                    {message.fromId === ownerProfile._id ?
                    ownerProfile.name :
                    peerProfile.name}
                    </Link></span>
                    <span className={s.messageDate}>{day + " " + month + " " + year + " " + time}</span>
                </div>
                <div className={s.messageFooter}>
                    <span>{message.text}</span>
                </div>
            </div>
        </div>
    )
}

export default Message;