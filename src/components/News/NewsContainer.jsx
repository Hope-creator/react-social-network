import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import News from './News';
import { getProfile, getNewsProfiles, clearNewsProfiles, addNew } from '../../redux/news-reducer';
import s from './News.module.css';

const NewsContainer = (props) => {

    const [newsProfiles, setNewsProfiles] = useState(new Set())

    
    props.newsItems
    .map(item => {
        if (!newsProfiles.has(item.userId)) setNewsProfiles(newsProfiles.add(item.userId))});;


    useEffect(() => {
        props.getProfile(props.userId)
    }, [props.userId]);

    useEffect(()=> {
        newsProfiles.forEach(id => {
        if(!props.newsProfiles
                .find(profile => id == profile.userId)) props.getNewsProfiles(id)});
                
    }, [newsProfiles.size]);


    let createNew = (userId, text, attachments) =>{

        let datenow = Date.now();

        let media = attachments.map(item =>{ 
            let mediaItemType = item.match("image") ? "photo" : "video"
            return {
            id: props.lastAttachemtId -1,
            type: mediaItemType,
            ownerId: props.userId,
            date: datenow,
            url: item
        };
    })
        props.addNew(userId, "post", datenow, text, media );
    }

    return (
        <News
        addNew={props.addNew}
        newsProfiles={props.newsProfiles} 
        profile={props.profile} 
        newsItems={props.newsItems} 
        createNew={createNew}
        />
    )
}


let mapStateToProps = (state) => {
    return {
        profile: state.newsPage.profile,
        userId: state.auth.id,
        newsItems: state.newsPage.newsItems,
        newsProfiles: state.newsPage.newsProfiles,
        lastAttachemtId: state.newsPage.lastAttachemtId
    }
}

let mapDispatchToProps = {
    getProfile, getNewsProfiles, clearNewsProfiles, addNew
}


export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);