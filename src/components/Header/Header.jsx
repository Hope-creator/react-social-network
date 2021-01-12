import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.header_link}>
                <NavLink to="/profile" activeClassName={s.active}>Social Network</NavLink>
            </div>
            <div className={s.header_features}>
                Header features
            </div>
            <div className={s.loginBlock}>
                { props.isAuth ? <div>
                    {props.login}
                    <button onClick={props.authLogoutThunk}>Logout</button>
                </div> : <NavLink to={'/login'}>
                    Login
            </NavLink>}
            </div>
        </header>
    )
}

export default Header;