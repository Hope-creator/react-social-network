import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import HeaderSearchUserForm from './HeaderSearchUserForm'
import HeaderAuthBlock from './HeadeAuthBlock';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const Header = (props) => {

    const { width } = useWindowDimensions();

    return (
        <header className={s.header}>
            <div className={s.header_link}>
                {width <= 600 ?
                    <button onClick={()=> props.changeVisibleNav()}><i className="fas fa-bars"></i></button> :
                    <NavLink to="/profile" activeClassName={s.active}>Social Network</NavLink>}
            </div>
            <div className={s.header_features}>
                <HeaderSearchUserForm
                setSearchUsersName={props.setSearchUsersName}
                />
            </div>
            <HeaderAuthBlock
                isAuth={props.isAuth}
                logout={props.logout}
            />

        </header>
    )
}

export default Header;