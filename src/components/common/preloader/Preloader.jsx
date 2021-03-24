import s from './Preloader.module.css';
import React from 'react';


const Preloader = (props) => {
    return <div className={s.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            </div>
} 

export default Preloader;