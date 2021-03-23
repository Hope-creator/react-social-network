import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfilePhotos from './ProfilePhotos';
import s from './ProfilePhotos.module.css'

let ProfilePhotosContainer = (props) => {

    let [currentPhotos, setCurrentPhotos] = useState('Photos');

    const setCurrent = (current) => {
        setCurrentPhotos(current)
    }

    return (
        <div>
            <ul className={s.ulContainer}>
                <li className={currentPhotos == 'Photos' ? s.active : undefined}
                onClick={()=>setCurrent('Photos')}>
                    <span className={s.photosIcon}>Photos</span>
                    </li>
                <li className={currentPhotos == 'Albums' ? s.active : undefined}
                onClick={()=>setCurrent('Albums')}><span className={s.albumsIcon}>Albums</span></li>
            </ul>
            <div  className={s.photosContainer}><ProfilePhotos photos={props.photos} current={currentPhotos}/></div>
        </div>
    )
}
//переделать с передачей через пропсы
let mapStateToProps = (state) =>{
    return {
        photos: state.profilePage.profilePhotos 
    }
}


const ProfilePhotosBlock = connect(mapStateToProps)(ProfilePhotosContainer);


export default ProfilePhotosBlock;