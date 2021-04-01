import React, { useEffect } from 'react';
import s from './Wall.module.css';
import Post from './Post'
import AddPostForm from './AddPostForm';
import { withGetOnScroll } from '../../../../hoc/withGetOnScroll';
import NoPost from './NoPosts';
import { CancelTokens } from '../../../../api/api';

const WallContainer = ({
    profileOwner, request,
    clearWallPosts, profile,
    wallPosts, pageSize, setCurrentPage,
    addNewPostThunk, getOnScroll
}) => {


    useEffect(() => {
        request(1, pageSize, profile._id);
        getOnScroll();
        return function cleanUp() {
            CancelTokens.postsCancel('Fetch cancelled by user')
            clearWallPosts();
            setCurrentPage(1);
            window.onscroll = null;
        }

    }, [profile._id, request, clearWallPosts, getOnScroll, setCurrentPage, pageSize])

    const posts = wallPosts.map(post => <Post key={post._id} profile={profile} post={post} />)

    return <div className={s.wallContainer}>
        <div className={s.postFormWrapper}>
            {profileOwner && <><div className={s.postFormHeader}>
                <p>What's new</p>
            </div>
                <AddPostForm addNewPostThunk={addNewPostThunk} />
            </>}
            {posts.length > 0 ? posts : <NoPost />}
        </div>
    </div>
}

const WallContainerWithGetOnScroll = withGetOnScroll(WallContainer)

export default WallContainerWithGetOnScroll;