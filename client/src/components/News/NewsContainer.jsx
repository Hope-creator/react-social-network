import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import News from './News';
import { getNews, getProfile,setCurrentPageNews, getNewsProfiles, clearNewsProfiles, clearNews } from '../../redux/news-reducer';
import { WithGetOnScroll } from '../../hoc/WithGetOnScroll';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


const NewsContainer = ({profile, userId, newsItems,
    newsUsersProfiles, lastAttachemtId, currentPage,
    pageSize, totalCount, getProfile,
    getNewsProfiles, setCurrentPage, clearNews,
    clearNewsProfiles, request, getOnScroll}) => {

    const [newsProfiles, setNewsProfiles] = useState([]);
    const [fetchingProfiles, setFetchingProfiles] = useState(false);

    useEffect(() => {
        newsItems.forEach(item => {
            if(!newsProfiles.includes(item.by._id)){
                setNewsProfiles([...newsProfiles,item.by._id]);
            }
        });
    }, [newsItems, newsProfiles]);


    useEffect(() => {
        getProfile(userId)
    }, [userId, getProfile]);

    useEffect(() => {
        newsProfiles.forEach(id => {
            if (!newsUsersProfiles
                .find(profile => id === profile._id) && !fetchingProfiles) {
                    setFetchingProfiles(true);
                     getNewsProfiles(id).then(res => {
                        if(res)setFetchingProfiles(false);
                    });
                }
        });
    }, [fetchingProfiles, newsProfiles, getNewsProfiles, newsUsersProfiles]);

    useEffect(() => {
        request(1, pageSize);
        getOnScroll();
        return function cleanUp() {
            clearNews();
            clearNewsProfiles();
            setCurrentPage(1)
        }
    }, [clearNews, clearNewsProfiles, getOnScroll, pageSize, request, setCurrentPage]);


    

    return (
        <News
            newsProfiles={newsUsersProfiles}
            profile={profile}
            newsItems={newsItems}
        />
    )
}

const NewsContainerWithGetOnScroll = WithGetOnScroll(NewsContainer)


let mapStateToProps = (state) => {
    return {
        profile: state.newsPage.profile,
        userId: state.auth.id,
        newsItems: state.newsPage.newsItems,
        newsUsersProfiles: state.newsPage.newsProfiles,
        lastAttachemtId: state.newsPage.lastAttachemtId,
        currentPage: state.newsPage.currentPage,
        pageSize: state.newsPage.pageSize,
        totalCount: state.newsPage.totalPostCount
    }
}

let mapDispatchToProps = {
    getProfile, getNewsProfiles, setCurrentPage: setCurrentPageNews,
    clearNews, clearNewsProfiles,
    request: getNews
}


export default 
compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )(NewsContainerWithGetOnScroll);