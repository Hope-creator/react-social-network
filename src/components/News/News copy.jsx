import React, { useEffect, useState, useCallback } from 'react';
import Preloader from '../common/preloader/Preloader';
import profilePicture from '../../img/profilePic.png'
import s from './News.module.css';
import { Link, NavLink } from 'react-router-dom';
import NewsItem from './NewsItem';
import { Field, Form } from 'react-final-form';
import { maxLength } from '../../utils/validators/validators';
import Dropzone from 'react-dropzone';
import {useDropzone} from 'react-dropzone';



const News = (props) => {

    if (!props.profile) return <Preloader />;

    let newsContent = props.newsItems.map(item => <div className={s.newsContentItem}>
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
                        <div className={s.newsHeaderNavbar}><NavLink activeClassName={s.activeLink} to="/news"><i class="far fa-newspaper"></i> Timeline </NavLink>
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
                        <AddPostForm />
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

const AddPostForm = () => {

    const onSubmit = values => {
        console.log(values);
        console.log(values);
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
                                    <input placeholder="Share your status..." {...input} />

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
                                    >{({ input, meta }) => (
                                        <div>
                                            <input type='file' multiple={true} name='photo' id='photo' {...input} className={s.postInputPhoto} accept=".jpg, .jpeg, .png" /><label for="photo" className={s.formPhoto}><i className="far fa-image"></i></label>
                                            <div>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        </div>
                                    )}
                                    </Field>
                                </div>
                                <div className={s.formPostVideo}>
                                    <Field
                                        name='newPostVideo'
                                    >{({ input, meta }) => (
                                        <div>
                                            <input type='file' name='video' id='video' {...input} className={s.postInputVideo} /><label for="video" className={s.formVideo}><i className="fas fa-video"></i></label>
                                            <div>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        </div>
                                    )}
                                    </Field>
                                    <MyDropzone/>
                                </div>
                            </div>
                            {props.values.newPostPhoto && <button className={s.sendPostButton} type="submit" onClick={() => { onSubmit(props.values); props.form.reset() }}>Send</button>}
                        </div>
                    </div>
                </div>
            </form>}
    />
}

const MyDropzone = () => {

    const [imageUrl, setImageUrl] = ('');

    const setImage = (file) => {
        setImageUrl(file)
    }


    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
        setImage(URL.createObjectURL(acceptedFiles[0])); 
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})
  
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        {imageUrl ? <img src={imageUrl} /> : null}
      </div>
    )
  }


export default News;