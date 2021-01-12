import React from 'react';
import { useState } from 'react';
import s from './ProfilePhotos.module.css';

const ProfilePhotos = (props) => {

    let [fullScreen , setFullScreen] = useState(false)

    let [fullScreenImgSrc, setFullScreenImgSrc] = useState('')

    const changeFullScreen =() => {
        setFullScreen(!fullScreen);
    }

    const settingFullScreenImgSrc = (src) => {
        setFullScreenImgSrc(src)
    }

   // let photoItems = props.posts.map((p) => <Post key={p.id} message={p.message} likes={p.likesCount} />);
    let photoItems = props.photos.map(p => <img onClick={()=> {changeFullScreen();settingFullScreenImgSrc(p.src)}}  key={p.id} src={p.src} alt={'Some discription'}/>);

    return (
        <>
        {props.current == 'Photos' ? photoItems: 'albums'}
        {fullScreen ? <div className={s.modal} onClick={()=>{changeFullScreen();settingFullScreenImgSrc('')}}>
            <img src={fullScreenImgSrc}  alt={'Some discription'}/></div>
            : null}
        </>
    )
}


export default ProfilePhotos;