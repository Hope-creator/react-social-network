import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import s from './Wall.module.css';
import { fileType, maxLength } from '../../../../utils/validators/validators';
import TextareaAutosize from 'react-textarea-autosize';



const AddPostForm = (props) => {

    const [attachments, setAttachments] = useState([]);
    const [picturesCount , setPicturesCount] = useState(0);
    const [videosCount , setVideosCount] = useState(0);

    const createNew = (text, attachments) => {
        let datenow = Date.now();
        let data = new FormData();
        attachments && attachments.map(file => data.append("attachments", file));
        text && data.append("text", text);
        data.append("ts", datenow);
        props.addNewPostThunk(data);
    }

    const onChangePicture = files => {
        if (files) {
            let arrFiles = [];
            let pics = 0;
            let vids = 0;
            for(let i = 0; i<files.length; i++) {
               if(files[i].type.match("image")) pics++; 
               if(files[i].type.match("video")) vids++; 
               arrFiles.push(files[i]);
               
        }
            setAttachments(attachments.concat(arrFiles));
            setPicturesCount(picturesCount+pics);
            setVideosCount(videosCount+vids);
        }
    }

    const clearAttachemnts = (type) => {
        setAttachments((prevFiles) => prevFiles.filter(item => item.type.match(type) ? false : true))
    }

    const onSubmit = (values, form) => {
        createNew( values.newPostBody, attachments);
        setAttachments([]);
        setPicturesCount(0);
        setVideosCount(0);
        setTimeout(form.reset);
        values.newPostPhoto = '';
        values.newPostVideo = '';
    }

    return <Form
        onSubmit={onSubmit}
        render={(props) =>
            <form onSubmit={props.handleSubmit}>
                <div className={s.formPost}>
                    <div className={s.newPostForm}>
                        <div className={s.formPostText}>
                            <Field validate={maxLength(500)}
                                name='newPostBody'
                            >{({ input, meta }) => (
                                <div>
                                    <TextareaAutosize className={s.formTextInput} placeholder="Share your status..." {...input}  minRows='8' />
                                    <div>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                </div>
                            )}
                            </Field></div>
                        <div className={s.formFooter}>
                            <div className={s.formPostMedia}>
                                <div className={s.formPostPhoto}>
                                    <Field
                                        name='newPostPhoto'
                                        validate={fileType("image")}
                                    >{({ input: { value, onChange, ...input }, meta }) => {

                                        const handleChange = ({ target }) => {
                                            onChange(target.files)
                                            onChangePicture(target.files)
                                        }

                                        return (
                                            <div>
                                                <input
                                                    id="postPhoto"
                                                    onClick={(event) => {
                                                        event.target.value = null
                                                    }}
                                                    className={s.newsMediaInput}
                                                    {...input} onChange={handleChange}
                                                    accept=".jpg, .jpeg, .png" type="file"
                                                    multiple={true} />
                                                    <label htmlFor="postPhoto"
                                                        className={s.formPhoto}>
                                                    <i className="far fa-image"></i>
                                                </label>
                                                {picturesCount ? <span className={s.mediaCount}>{`+ ${picturesCount}`}</span> : null}
                                                {picturesCount ? <button
                                                    type="button"
                                                    className={s.postMediaClearButton}
                                                    onClick={() => {
                                                        props.form.change('newPostPhoto', undefined);
                                                        clearAttachemnts("image");
                                                        setPicturesCount(0);
                                                    }} ><i className="fas fa-times"></i></button> : null}
                                                <div>
                                                    {meta.error && meta.touched && <span className={s.mediaInputError}>{meta.error}</span>}
                                                </div>
                                            </div>
                                        )
                                    }}
                                    </Field>
                                </div>
                                <div className={s.formPostVideo}>
                                    <Field
                                        name='newPostVideo'
                                        validate={fileType("video")}
                                    >
                                        {({ input: { value, onChange, ...input }, meta }) => {
                                            const handleChange = ({ target }) => {
                                                onChange(target.files)
                                                onChangePicture(target.files)
                                            }
                                            return (
                                                <div>
                                                    <input
                                                        onClick={(event) => {
                                                            event.target.value = null
                                                        }}
                                                        id="postVideo"
                                                        className={s.newsMediaInput}
                                                        {...input}
                                                        onChange={handleChange}
                                                        accept=".mp4, .mov, .wmv, .flv, .webm, .mkv"
                                                        type="file"
                                                        multiple={true} /><label htmlFor="postVideo" className={s.formVideo}>
                                                        <i className="fas fa-video"></i>
                                                    </label>
                                                    {videosCount ? <span className={s.mediaCount}>{`+ ${videosCount}`}</span> : null}
                                                    {videosCount ? <button
                                                        type="button"
                                                        className={s.postMediaClearButton}
                                                        onClick={() => {
                                                            props.form.change('newPostVideo', undefined);
                                                            clearAttachemnts("video");
                                                            setVideosCount(0);
                                                        }} ><i className="fas fa-times"></i></button> : null}
                                                    <div>
                                                        {meta.error && meta.touched && <span className={s.mediaInputError}>{meta.error}</span>}
                                                    </div>
                                                </div>
                                            )
                                        }}
                                    </Field>
                                </div>
                            </div>
                            {!props.pristine ? <button className={s.postSubmitButton} type="submit">Send</button> : null}
                        </div>
                    </div>
                </div>
            </form>}
    />
}



export default AddPostForm;