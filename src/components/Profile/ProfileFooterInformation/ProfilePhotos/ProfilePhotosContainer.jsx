import React, { useEffect } from 'react';
import { WithGetOnScroll } from '../../../../hoc/WithGetOnScroll';
import ProfilePhotos from './ProfilePhotos';
import s from './ProfilePhotos.module.css'

let ProfilePhotosContainer = (props) => {
    const {request, getOnScroll,
        clearProfilePhotos, setCurrentPage,
        profile, pageSize} = props;
    useEffect(() => {
        request(1, pageSize, profile._id);
        getOnScroll()
        return function cleanUp() {
            clearProfilePhotos();
            setCurrentPage(1);
            window.onscroll = null;
        }

    }, [profile._id, clearProfilePhotos, getOnScroll, pageSize, request, setCurrentPage])


    return (
        <div className={s.photosContainer}>
            <ProfilePhotos
                photos={props.photos}
                profileOwner={props.profileOwner}
                addNewPhotos={props.addNewPhotos}
            />
        </div>
    )
}

const ProfilePhotosWithGetOnScroll = WithGetOnScroll(ProfilePhotosContainer)

export default ProfilePhotosWithGetOnScroll;