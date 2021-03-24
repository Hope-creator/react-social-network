import React from 'react';
import s from './ProfilePhotos.module.css';


let NoPhotos = () => {

    return <div className={s.noPhotosWrapper}>
        <div className={s.noPhotosBody}>
            <i className="fas fa-camera"></i>
            <div>No photos found</div>
            </div>
    </div>
}




export default NoPhotos;