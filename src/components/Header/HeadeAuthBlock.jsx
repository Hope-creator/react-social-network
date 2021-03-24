import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const HeaderAuthBlock = ({isAuth, logout}) => {



    return <div className={s.HeaderAuth}>
        <NavLink to="/reset"><span>Reset password</span></NavLink>
       {    isAuth ?
           <button className={s.logoutBtn} onClick={()=> logout()}>Logout</button> :
           <>
           <NavLink to ="/login"><span>Sign in</span></NavLink>
           <NavLink to ="/join"><span>Sign up</span></NavLink>
           </>
           }
    </div>
    
}

export default HeaderAuthBlock;