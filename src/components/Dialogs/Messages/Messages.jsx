import React, { useEffect } from 'react';
import { WithGetOnScroll } from '../../../hoc/WithGetOnScroll';
import Message from './Message/Message';
import AddMessageForm from './Message/AddMessageForm';
import profilePicture from '../../../img/profilePic.png'
import Preloader from '../../common/preloader/Preloader';
import s from './Messages.module.css';
import socket from '../../../socket';



const Messages = (props) => {
    const {request, getOnScroll, pageSize, searchName,
        clearCurrentConverastionProfile,clearMessages,
        currentConversation, setNewOneMessage, messages,
        readOnOpen, currentConversationId} = props;

    useEffect(()=> {
        if(messages.length > 0 && messages[0].fromId === currentConversation) {
            readOnOpen(currentConversationId)
        }
    },[messages, currentConversation, currentConversationId, readOnOpen])

    useEffect(()=> {
        request(1, pageSize, searchName);
        getOnScroll();
        return function cleanUp() {
            clearCurrentConverastionProfile();
            clearMessages();
        }
    },[request, getOnScroll, pageSize, searchName, clearCurrentConverastionProfile,clearMessages]);

    useEffect(()=> {
        const newMessageHandler = (message) => {
            let newMessage = null;
            if(message.message && message.message.fromId === currentConversation) {
                newMessage = message.message;
            }
            if(newMessage) setNewOneMessage(newMessage);
        }
        socket.on("message", newMessageHandler)
        return function cleanUp(){
            socket.off("message", newMessageHandler)
    }
    },[currentConversation, setNewOneMessage])


    if(!props.currentConversationProfile) return <Preloader />


    const messagesItems = messages.map(m => <Message
        key={m._id}
        message={m}
        peerProfile={props.currentConversationProfile}
        ownerProfile={props.ownerProfile}
        />)

    const peerPhoto = props.currentConversationProfile.profile.profilePicture || profilePicture;
    const peerName = props.currentConversationProfile.name;



    return (
        <div >
            <div className={s.messagesProfile}>
                <div className={s.returnLink} onClick={()=>props.setCurrentConversation('')}>
                    <i className="fas fa-chevron-left"></i> Back to conversations</div>
                <img
                className={s.messagesProfilePhoto}
                src={peerPhoto} alt={`profile_photo_${props.currentConversationProfile._id}`}/>
                <div><span>{peerName}</span></div>
                </div>
            <AddMessageForm
            onMessageThunk={props.onMessageThunk}
            peerId={currentConversation}
            fromId={props.ownerProfile._id}
            />
            {messagesItems}
        </div>
    )
}

const MessagesWithGetOnScroll = WithGetOnScroll(Messages)

export default MessagesWithGetOnScroll;