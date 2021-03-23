import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { addMessage, getMessagesProfiles, getOwnerProfile, clearMessagesProfiles } from '../../redux/dialogs-reducer';
import { Redirect, withRouter } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Dialogs from './Dialogs';
import Message from './Message/Message';
import { useState } from 'react';
import { useEffect } from 'react';


let DialogsContainer = (props) => {

    // setting usersIds for get conversations profiles
    let conversationsSet = new Set();
    if(props.dialogsMessages) props.dialogsMessages
    .sort(function(a,b) {return b.date - a.date})
    .map(message => conversationsSet.add(message.userId));


    // .get for conversations profiles for markup
    useEffect(()=> {
        conversationsSet.forEach(id =>props.getMessagesProfiles(id));
        return () => {props.clearMessagesProfiles()}
    }, conversationsSet)


    // .get owner profile for markup
    useEffect(()=> {
        props.getOwnerProfile(props.ownerId)
    }, [props.ownerId])


    // add new message
   let onAddMessage = (userId,fromId,message) => {
        props.addMessage(+userId.userId,fromId,message, Date.now());
    }


    // if not auth redirect to login form
    if (!props.isAuth) return <Redirect to={"/login"} />;

    return (
        <Dialogs 
        ownerProfile={props.ownerProfile}
        messagesProfiles={props.messagesProfiles}
        onAddMessage={onAddMessage}
        dialogsMessages={props.dialogsMessages}
        currentConversation={props.match.params}
        ownerId={props.ownerId}
        conversationsSet={conversationsSet}
        />
    )

}

let mapStateToProps = (state) =>{
    return {
        dialogsMessages: state.dialogsPage.dialogsMessages,
        messagesProfiles: state.dialogsPage.messagesProfiles,
        ownerId: state.auth.id,
        ownerProfile: state.dialogsPage.ownerProfile
    }
}

let mapDispatchToProps = {addMessage, getMessagesProfiles, getOwnerProfile, clearMessagesProfiles}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(DialogsContainer);