import React from 'react';
import { Link } from 'react-router-dom';
import s from './NoMatch.module.css';

const NoMatch = () => {

    return <div className={s.noMatchWrapper}>
        <h2>404: Page not found</h2>
        <div>Sorry, we've misplaced that URL or it's pointing to something
            that doesn't exist. <div><Link to="/profile" className={s.backLink}>Head back to profile</Link></div>
        </div>
    </div>
}

export default NoMatch;