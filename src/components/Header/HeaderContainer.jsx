import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { authLogoutThunk } from '../../redux/auth-reducer'

class HeaderContainer extends React.Component {

   

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

const mapDispatchToProps = { authLogoutThunk}

export default connect(mapStateToProps,mapDispatchToProps)(HeaderContainer);