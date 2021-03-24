import React from 'react';
import s from '../ProfileInformation.module.css';
import Preloader from '../../common/preloader/Preloader';
import { useState } from 'react';
import WallContainerWithGetOnScroll from './Wall/WallContainer';
import ProfilePhotosWithGetOnScroll from './ProfilePhotos/ProfilePhotosContainer';

const ProfileFooterInformationContainer = (props) => {
    
    
    const [selectedInfo, setSelectedInfo] = useState("Wall");
    

    if (!props.profile) {
        return <Preloader />
    }

    const content = () => {
        if(selectedInfo === "Wall") return  <WallContainerWithGetOnScroll
        profileOwner={props.profileOwner}
        request={props.getPosts}
        clearWallPosts={props.clearWallPosts}
        totalCount={props.totalWallCount}
        profile={props.profile}
        wallPosts={props.wallPosts}
        pageSize={props.pageSizeWall}
        setCurrentPage = {props.setWallCurrentPage}
        addNewPostThunk={props.addNewPostThunk}
        searchName={props.profile._id}
        currentPage={props.currentPageWall}
        /> 
        if(selectedInfo === "Photos") return <div className={s.photosContainer}>
        <ProfilePhotosWithGetOnScroll
        profile={props.profile}
        profileOwner={props.profileOwner}
        photos={props.profilePhotos}
        request={props.getPhotos}
        clearProfilePhotos={props.clearProfilePhotos}
        totalCount={props.totalPhotosCount}
        pageSize={props.pageSizePhotos}
        setCurrentPage={props.setPhotosCurrentPage}
        searchName={props.profile._id}
        currentPage={props.currentPagePhotos}
        addNewPhotos={props.addNewPhotos}
        /></div>
    }


    return (
        <div className={s.content}>
            <ul className={s.ulContainer}>
            <li className={selectedInfo === 'Wall' ? s.active : undefined}
                onClick={()=> setSelectedInfo('Wall')}>
                    <i className="far fa-sticky-note"></i> Wall
                    </li>
                <li className={selectedInfo === 'Photos' ? s.active : undefined}
                onClick={()=> setSelectedInfo('Photos')}>
                    <i className="fas fa-camera"></i> Photos
                    </li>
            </ul>
            <div className={s.profileSideContent}>
                {content()}      
            </div>
        </div>
    )
}

export default ProfileFooterInformationContainer