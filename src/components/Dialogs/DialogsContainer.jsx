import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import {
    getCurrentConversationProfile, setConversationsCurrentPage,
    setMessagesCurrentPage, addMessage,
    getConversations,getMessages,
    getConversationsProfiles, getOwnerProfile,
    clearMessagesProfiles, clearMessages,
    clearConversations, clearCurrentConverastionProfile,
    setNewOneMessage, updateConversation,
    onMessageThunk
} from '../../redux/dialogs-reducer';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import s from './Dialogs.module.css'
import ConversationsWithGetOnScroll from './Conversations/Conversations';
import MessagesWithGetOnScroll from './Messages/Messages';
import Preloader from '../common/preloader/Preloader';
import { readConversation } from '../../socket';


let DialogsContainer = (props) => {


    const {
        getOwnerProfile, ownerId, getCurrentConversationProfile
    } = props
  
    // set current conversation for fetch messages

    const [currentConversation, setCurrentConversation] = useState('');
    const [currentConversationId, setCurrentConversationId] = useState('');

    // .get owner profile for markup
    useEffect(()=> {
        getOwnerProfile(ownerId)
    }, [ownerId, getOwnerProfile])

    //fetch messages
    /*useEffect(()=> {
        props.getMessages(1, 10, currentConversation)
    },[])*/

    //fetch current conversation profile
    useEffect(()=> {
        if(currentConversation) {
            getCurrentConversationProfile(currentConversation)
        }
    },[currentConversation, getCurrentConversationProfile])

    const readOnOpen = (conversation) => {
        readConversation(conversation);
    }


    // if not auth redirect to login form
    if (!props.ownerProfile) return <Preloader />;
    

    return (
        <div className={s.dialogsContainer}>
            {currentConversation ?
            <MessagesWithGetOnScroll
            messages={props.messages}
            setCurrentPage={props.setMessagesCurrentPage}
            currentPage={props.currentPageMessages}
            request={props.getMessages}
            searchName={currentConversation}
            pageSize={props.pageSizeMessages}
            totalCount={props.conversationsCount}
            setCurrentConversation={setCurrentConversation}
            ownerProfile={props.ownerProfile}
            currentConversationProfile={props.currentConversationProfile}
            clearCurrentConverastionProfile={props.clearCurrentConverastionProfile}
            clearMessages={props.clearMessages}
            setNewOneMessage={props.setNewOneMessage}
            currentConversation={currentConversation}
            readOnOpen={readOnOpen}
            currentConversationId={currentConversationId}
            onMessageThunk={props.onMessageThunk}
            />
             :
             <ConversationsWithGetOnScroll
             conversations={props.conversations}
             setCurrentPage={props.setConversationsCurrentPage}
             currentPage={props.currentPageConversations}
             request={props.getConversations}
             pageSize={props.pageSizeConversations}
             conversationsProfiles={props.conversationsProfiles}
             ownerProfile={props.ownerProfile}
             totalCount={props.conversationsCount}
             setCurrentConversation={setCurrentConversation}
             clearConversations={props.clearConversations}
             updateConversation={props.updateConversation}
             getConversationsProfiles={props.getConversationsProfiles}
             readOnOpen={readOnOpen}
             setCurrentConversationId={setCurrentConversationId}
             clearConversationsProfiles={props.clearMessagesProfiles}
            />
            }
        </div> 
    )
}

let mapStateToProps = (state) =>{
    return {
        conversations: state.dialogsPage.conversations,
        conversationsProfiles: state.dialogsPage.conversationsProfiles,
        ownerId: state.auth.id,
        ownerProfile: state.dialogsPage.ownerProfile,
        messages: state.dialogsPage.messages,
        conversationsCount: state.dialogsPage.conversationsCount,
        messagesCount: state.dialogsPage.messagesCount,
        currentPageConversations: state.dialogsPage.currentPageConversations,
        pageSizeConversations: state.dialogsPage.pageSizeConversations,
        currentPageMessages: state.dialogsPage.currentPageMessages,
        pageSizeMessages: state.dialogsPage.pageSizeMessages,
        currentConversationProfile: state.dialogsPage.currentConversationProfile
    }
}

let mapDispatchToProps = {
    addMessage, getConversationsProfiles,
    getOwnerProfile, clearMessagesProfiles,
    getConversations, getMessages,
    setConversationsCurrentPage, setMessagesCurrentPage,
    getCurrentConversationProfile, clearMessages,
    clearConversations, clearCurrentConverastionProfile,
    setNewOneMessage, updateConversation,
    onMessageThunk
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(DialogsContainer);
