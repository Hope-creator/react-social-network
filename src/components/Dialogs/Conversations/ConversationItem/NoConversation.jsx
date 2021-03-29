import React from 'react';
import s from './ConversationItem.module.css';

const NoConversation = () => {

    return (
        <div className={s.noConversationWrapper}>
        <div className={s.noConversationBody}>
            <i className="far fa-envelope"></i>
            <div>You don't have any conversations yet</div>
            </div>
    </div>
    )
}

export default NoConversation;