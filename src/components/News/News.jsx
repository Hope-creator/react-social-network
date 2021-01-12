import React, { useEffect, useState, useCallback } from 'react';
import Preloader from '../common/preloader/Preloader';
import s from './News.module.css';
import { Link, NavLink } from 'react-router-dom';
import NewsItem from './NewsItem';
import { Field, Form } from 'react-final-form';
import { fileType, maxLength } from '../../utils/validators/validators';

const News = (props) => {

    if (!props.profile) return <Preloader />;

    let newsContent = [...props.newsItems].sort((a, b) => b.date - a.date).map(item =>
        <div className={s.newsContentItem} key={item.id}>
            <NewsItem
                id={item.id}
                propsDate={item.date}
                profile={props.newsProfiles.find(profile => profile.userId == item.userId)} type={item.type}
                text={item.text}
                type={item.type}
                attachments={item.attachments}
            />
        </div>)


    return (
        <div>
            <div className={s.newsHeader}>
                <div className={s.newsHeaderLeftSide}>
                    <img className={s.newsHeaderPhoto} src={props.profile.photos.small} alt="news-photo" />
                    <div className={s.newsHeaderInfo}>
                        <Link to="/profile"><h2>{props.profile.fullName}</h2></Link>
                        <div className={s.newsHeaderNavbar}>
                            <NavLink activeClassName={s.activeLink} to="/news"><i class="far fa-newspaper"></i> Timeline </NavLink>
                            <NavLink to="/profile"><i class="far fa-user-circle"></i> About</NavLink>
                            <NavLink to="/friends"><i class="fas fa-users"></i> Friends </NavLink>
                        </div>
                    </div>
                </div>
                <div className={s.newsHeaderRightSide}>
                    <div className={s.newsRightSideTop}>
                        <p>What's new</p>
                    </div>
                    <div className={s.newsRightSideMiddle}>
                        <AddPostForm
                            id={props.profile.userId}
                            addNew={props.addNew}
                            createNew={props.createNew}
                        />
                    </div>
                    <div className={s.newsRightSideBottom}>
                    </div>
                </div>
            </div>
            <div className={s.newsContent}>
                {newsContent}
            </div>
        </div>
    )
}

const AddPostForm = (props) => {

    const [attachments, setAttachments] = useState([]);
    const onChangePicture = files => {
        if (files) {
            let array = Array.from(files);
            array.map(file => {
                if (file.type.match("video") || file.type.match("image")) {
                    const reader = new FileReader();
                    reader.addEventListener("load", () => {
                        setAttachments((prevFiles) => prevFiles.concat(reader.result));
                    });
                    reader.readAsDataURL(file);
                }
            }
            )
        }
    }

    const clearAttachemnts = (type) => {
        setAttachments((prevFiles) => prevFiles.filter(item => item.match(type) ? false : true))
    }

    const onSubmit = (values, form) => {
        props.createNew(props.id, values.newPostBody, attachments);
        setAttachments([]);
        setTimeout(form.reset);
        values.newPostPhoto = '';
        values.newPostVideo = '';
    }

    return <Form
        onSubmit={onSubmit}
        render={(props) =>
            <form onSubmit={props.handleSubmit}>
                <div className={s.sendForm}>
                    <div className={s.newPostForm}>
                        <div className={s.formPostText}>
                            <Field validate={maxLength(500)}
                                name='newPostBody'
                            >{({ input, meta }) => (
                                <div>
                                    <input className={s.formTextInput} placeholder="Share your status..." {...input} />
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
                                                    multiple={true} /><label for="postPhoto"
                                                        className={s.formPhoto}>
                                                    <i className="far fa-image"></i>
                                                </label>
                                                {value ? <span className={s.mediaCount}>{`+ ${value.length}`}</span> : null}
                                                {value ? <button
                                                    type="button"
                                                    className={s.postMediaClearButton}
                                                    onClick={() => {
                                                        props.form.change('newPostPhoto', undefined);
                                                        clearAttachemnts("image")
                                                    }} ><i class="fas fa-times"></i></button> : null}
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
                                                        multiple={true} /><label for="postVideo" className={s.formVideo}>
                                                        <i className="fas fa-video"></i>
                                                    </label>
                                                    {value ? <span className={s.mediaCount}>{`+ ${value.length}`}</span> : null}
                                                    {value ? <button
                                                        type="button"
                                                        className={s.postMediaClearButton}
                                                        onClick={() => {
                                                            props.form.change('newPostVideo', undefined);
                                                            clearAttachemnts("video")
                                                        }} ><i class="fas fa-times"></i></button> : null}
                                                    <div>
                                                        {meta.error && meta.touched && <span className={s.mediaInputError}>{meta.error}</span>}
                                                    </div>
                                                </div>
                                            )
                                        }}
                                    </Field>
                                </div>
                            </div>
                            {!props.pristine ? <button className={s.postSubmitButton} type="submit">send</button> : null}
                        </div>
                    </div>
                </div>
            </form>}
    />
}
export default News;