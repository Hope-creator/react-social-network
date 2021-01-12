import React from 'react';
import { Field, Form } from 'react-final-form';
import { maxLength } from '../../utils/validators/validators';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import TextareaAutosize from 'react-textarea-autosize';
import profilePic from '../../img/profilePic.png'


const Dialogs = ({ messagesProfiles, dialogsMessages, onAddMessage, currentConversation, ownerProfile, ownerId, conversationsSet },) => {

    if (!messagesProfiles || !dialogsMessages || !ownerProfile) return <div>loading</div>;

    let arrayFromSet = Array.from(conversationsSet);

    let orderedMessagesProfiles = messagesProfiles.sort(function(a, b){ 
        return arrayFromSet.indexOf(a.userId) - arrayFromSet.indexOf(b.userId);
      });

    let conversations = orderedMessagesProfiles.map((p) =>
        <DialogItem key={p.userId} name={p.fullName} id={p.userId} media_src={p.photos.small || profilePic} />)

    let messages = dialogsMessages.map((m) => m.userId == currentConversation.userId ?
        <Message key={m.id} profile={m.fromId == ownerProfile.userId ?
            ownerProfile
            : messagesProfiles.find((profiles) => profiles.userId == m.fromId)
        } message={m.message} fromId={m.fromId} ownerId={ownerId} profilePic={profilePic} date={m.date} /> : null)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {conversations}
            </div>
            {conversationsSet.has(+currentConversation.userId) ? <div className={s.messagesWrapper}>
                <div className={s.messagesForm}>
                    <AddMessageForm currentConversation={currentConversation} ownerId={ownerId} onAddMessage={onAddMessage} />
                </div>
                <div className={s.messages}>
                    {messages}
                </div>
            </div> 
            : null}
            
        </div >
    )
}

const AddMessageForm = (props) => {

    const onSubmit = (values) => {
        props.onAddMessage(props.currentConversation, props.ownerId, values.newMessageBody);
    }

    return (
        <Form
        initialValues={{newMessageBody: ''}}
            onSubmit={onSubmit}
            render={({ handleSubmit, values, form }) =>
                <form onSubmit={handleSubmit}>
                    <div className={s.sendForm}>
                        {values.newMessageBody ? <button className={s.messageButton} type="submit" onClick={()=>{onSubmit(values); form.reset()}}>Send</button> : null}
                        <div className={s.message_area}>
                            <Field validate={maxLength(1000)} className={s.formInputText}
                                name='newMessageBody'
                            >{({ input, meta }) => (
                                <div>
                                    <TextareaAutosize placeholder="Enter your message" {...input} maxRows='5' minRows='2' />
                                    <div>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                </div>
                            )}
                            </Field>
                        </div>
                    </div>
                </form>}
        />

    )
}

export default Dialogs;