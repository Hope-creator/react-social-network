import React from 'react';
import { Field, Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import s from './SendMessageForm.module.css';
import TextareaAutosize from 'react-textarea-autosize';
import FocusTrap from 'focus-trap-react';


const SendMessageForm = ({ownerId, peerId, peerPhoto, peerName, changeShowModal, onMessageThunk}) => {
    
    if(!ownerId) return <div>Need to log in for messaging...</div>
    if(!peerId) return <div>Loading...</div>

    const onSubmit = (values) => {
        
        const date = Date.now();
        const text = values.messageText;
        const message = {
            from: ownerId,
            peerId: peerId,
            ts: date,
            text: text,
            attachments: []
        }
        onMessageThunk(message, peerId, 0)
    }


    return <FocusTrap>
        <div className={s.modal}>
            <div className={s.formWrapper}>
                <div className={s.formHeader}>
                    <div className={s.formHeaderTitle}>New message</div>
                    <div className={s.formHeaderControls}>Go to messages</div>
                    <div className={s.formHeaderXButton} onClick={()=> changeShowModal()}><i className="fas fa-times"></i></div>

                </div>
                <div className={s.formContent}>
                    <div className={s.formContentHeader}>
                        <Link to={`/profile/${peerId}`}><img className={s.contentHeaderImg} src={peerPhoto} alt="profile__photo"></img></Link>
                        <Link to={`/profile/${peerId}`}><h3 className={s.contentHeaderText}>{peerName}</h3></Link>
                    </div>
                    <Form
                        onSubmit={onSubmit}
                        render={({ handleSubmit }) =>
                            <form onSubmit={handleSubmit}>
                                <Field name="messageText"
                                >{({ input, meta }) => (
                                    <div>
                                        <TextareaAutosize minRows='6' maxRows='10   ' {...input} style={{ overflow: "auto" }} />
                                        <div>
                                            {meta.error && meta.touched && <span>{meta.error}</span>}
                                        </div>
                                    </div>)
                                    }
                                </Field>
                                <button className={s.submitBtn}>Send</button>
                            </form>
                        }
                    />


                </div>
            </div>
        </div>
    </FocusTrap>
}

export default SendMessageForm