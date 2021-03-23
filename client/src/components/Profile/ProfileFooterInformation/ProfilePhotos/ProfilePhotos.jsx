import React from 'react';
import { useState } from 'react';
import AddPhotosForm from './AddPhotosForm';
import NoPhotos from './NoPhotos';
import s from './ProfilePhotos.module.css';

const ProfilePhotos = (props) => {

    let [fullScreen, setFullScreen] = useState(false)

    let [fullScreenImgUrl, setFullScreenImgUrl] = useState('');

    const changeFullScreen = () => {
        setFullScreen(!fullScreen);
    }

    const settingFullScreenImgUrl = (url) => {
        setFullScreenImgUrl(url)
    }



    // let photoItems = props.posts.map((p) => <Post key={p.id} message={p.message} likes={p.likesCount} />);
    let photoItems = props.photos.map(p => <img onClick={() => { changeFullScreen(); settingFullScreenImgUrl(p.url) }} key={p._id} src={p.url} alt={p.url} />);

    return (
        <div className={photoItems.length > 0 ? s.photosBlock : s.photosBlockNoPadding}>
           {props.profileOwner && <AddPhotosForm 
            addNewPhotos={props.addNewPhotos}
            />}
            {photoItems.length > 0 ? photoItems : <NoPhotos />}
            {fullScreen ? <div className={s.modal} onClick={() => { changeFullScreen(); settingFullScreenImgUrl('') }}>
                <img src={fullScreenImgUrl} alt={'Some discription'} /></div>
                : null}
        </div>
    )
}




export default ProfilePhotos;