import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { authLogoutThunk } from '../../redux/auth-reducer';
import { setSearchUsersName } from '../../redux/users-reducer'

class HeaderContainer extends React.Component {

    logout = () => {
        this.props.authLogoutThunk();
        window.location.reload(); 
    }

    render() {
        return <Header
        isNavHidden={this.props.isNavHidden}
        changeVisibleNav={this.props.changeVisibleNav}
        setSearchUsersName={this.props.setSearchUsersName}
        login={this.props.login}
        isAuth={this.props.isAuth}
        logout={this.logout}
        />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

const mapDispatchToProps = { authLogoutThunk, setSearchUsersName}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderContainer);