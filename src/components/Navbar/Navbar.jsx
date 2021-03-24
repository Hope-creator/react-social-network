import React from 'react';
import { NavLink } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import s from './Navbar.module.css';

const Navbar = ({ isNavHidden, unreadConversations, changeVisibleNav }) => {

    const { width } = useWindowDimensions();

    return (
        <nav className={isNavHidden ? s.navHidden : s.nav}>
            <ul>
                <li className={s.item}
                    onClick={() => width <=600 && changeVisibleNav()}>
                    <NavLink to="/profile" activeClassName={s.active}>
                        <i className="far fa-user-circle"></i>
                        <div>Profile</div>
                    </NavLink>
                </li>
                <li className={s.item}
                    onClick={() => width <=600 && changeVisibleNav()}>
                    <NavLink to="/dialogs" activeClassName={s.active}>
                        <i className="far fa-comments"></i>
                        <div>Messages</div>
                        <span className={s.unreadConversations}>{unreadConversations > 0 && unreadConversations}
                        </span>
                    </NavLink>
                </li>
                <li className={s.item}
                    onClick={() => width <=600 && changeVisibleNav()}>
                    <NavLink to="/news" activeClassName={s.active}>
                        <i className="far fa-newspaper"></i>
                        <div>Timeline</div>
                    </NavLink>
                </li>
                <li className={s.item}
                    onClick={() => width <=600 && changeVisibleNav()}>
                    <NavLink to="/friends" activeClassName={s.active}>
                        <i className="fas fa-user-friends"></i>
                        <div>Friends</div>
                    </NavLink>
                </li>
                <li className={s.item}
                    onClick={() => width <=600 && changeVisibleNav()}>
                    <NavLink to="/users" activeClassName={s.active}>
                        <i className="fas fa-users"></i>
                        <div>Users</div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;