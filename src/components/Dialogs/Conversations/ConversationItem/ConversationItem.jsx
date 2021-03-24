import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './ConversationItem.module.css';
import profilePicture from '../../../../img/profilePic.png'
import Preloader from '../../../common/preloader/Preloader'

const ConversationItem = ({ profile, conversation,
    setCurrentConversation,
    ownerProfile, getConversationsProfiles,
    setCurrentConversationId }) => {

    if (!profile || !conversation) return <Preloader />

    let date = new Date(conversation.lastMessage.ts);

   

    let minutes = date.getMinutes();
    if (minutes > -1 && minutes <10) minutes = "0" + minutes;
    let day = date.getDate(), month, year = date.getFullYear(), time = date.getHours() + ":" + minutes;
    
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

        default : month = "January"
    }

    const lastMessage = conversation.lastMessage

    return (
        <div className={s.conversation} onClick={() => {
            setCurrentConversation(conversation.peerId);
            setCurrentConversationId(conversation._id)
        }}>
            <div className={s.conversationProfile}>
                <NavLink to={"/dialogs/" + profile._id} activeClassName={s.active} className={s.conversationProfileLink}>
                    <div className={s.conversationMedia}>
                        <img src={profile.profile.profilePicture ?? profilePicture} alt="pic" className={s.mediaObject} />
                    </div>
                </NavLink>
            </div>
            <div className={s.conversationContent}>
                <span>{profile.name}</span>
                <span className={s.conversationTime}>{day + " " + month + " " + year + " " + time}</span>
                <div className={conversation.unread ? s.lastMessageUnread : s.lastMessage}>
                    {lastMessage.text &&
                        <span>
                            {conversation.lastMessage.fromId === ownerProfile._id  ? 
                            <img
                            alt="profile__picture"
                            className={s.lastMessageImage}
                            src={ownerProfile.profile.profilePicture ?? profilePicture} /> :
                            null}
                            {lastMessage.text}
                        </span>}
                        
                </div>
            </div>
        </div>
    )
}

export default ConversationItem;