import React, { useEffect, useState } from 'react';
import { withGetOnScroll } from '../../../hoc/withGetOnScroll';
import ConversationItem from './ConversationItem/ConversationItem';
import socket from '../../../socket';
import NoConversation from './ConversationItem/NoConversation'

const Conversations = (props) => {

    const {
        request, getOnScroll, clearConversations,
        pageSize, getConversationsProfiles, conversationsProfiles,
        conversations, clearConversationsProfiles
    } = props

    const [conversationsProfilesState, setConversationsProfilesState] = useState([]);
    const [fetchProfiles, setFetchProfiles] = useState(false);

    //set profiles IDs for getting profiles 
    useEffect(() => {
        conversations.forEach(conversation => {
            if(!conversationsProfilesState.includes(conversation.peerId)){
                setConversationsProfilesState([...conversationsProfilesState, conversation.peerId])
            }
        });
    },[conversations, conversationsProfilesState]);

    //fetch only necessaries profiles
    useEffect(()=> {
        conversationsProfilesState.forEach( id => {
            if(!conversationsProfiles
                .find( profile => id === profile._id) && !fetchProfiles) {
                    setFetchProfiles(true);
                    getConversationsProfiles(id).then(res=>{
                        if(res) setFetchProfiles(false);
                    });
                }
        })
    },[fetchProfiles, conversationsProfilesState,getConversationsProfiles,conversationsProfiles])

    const updateConversationHandler = (conversation) => {
        if(conversation) props.updateConversation(conversation)
    }

    useEffect(()=> {
        request(1, pageSize);
        getOnScroll();
        return function cleanUp() {
            clearConversations()
            clearConversationsProfiles()
        }
    },[request, getOnScroll, clearConversations, pageSize, clearConversationsProfiles])
    
    //update conversations

    useEffect(()=> {
        socket.on("updateConversation", updateConversationHandler)
        return function cleanUp() {
            socket.off("updateConversation", updateConversationHandler)
        }
    })


    const conversationsItems = props.conversations.map(c=>{
        return <ConversationItem
        key={c._id}
        profile={props.conversationsProfiles.find(
        cProfile => cProfile._id === c.peerId)}
        conversation={c}
        ownerProfile={props.ownerProfile}
        setCurrentConversation={props.setCurrentConversation}
        getConversationsProfiles={props.getConversationsProfiles}
        readOnOpen={props.readOnOpen}
        setCurrentConversationId={props.setCurrentConversationId}
        />
    })

    return (
        <div>
           {conversationsItems.length > 0 ?
           conversationsItems :
           <NoConversation />}
        </div>
    )
}

const ConversationsWithGetOnScroll = withGetOnScroll(Conversations)

export default ConversationsWithGetOnScroll;