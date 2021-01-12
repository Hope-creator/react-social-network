import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import NewsContainer from './components/News/NewsContainer';
import UsersConainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/preloader/Preloader';
import store from './redux/redux-store';
import Friends from './components/Friends/Friends';
import FriendsContainer from './components/Friends/FriendsContainer';


//lazy load
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    return !this.props.initialized ? <Preloader /> : 
        /* not working with initialized on github */(
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className="app-wrapper-content">
            <Suspense fallback={<Preloader />}>
           <Switch>
            <Redirect exact from="/" to="/profile" />
            <Route path="/login" render={(() => <Login />)} />
            <Route path="/dialogs/:userId?" render={(() => <DialogsContainer />)} />
            <Route path="/profile/:userId?" render={(() => <ProfileContainer />)} />
            <Route path="/news" render={(() => <NewsContainer />)} />
            <Route path="/friends" render={(() => <FriendsContainer />)} />
            <Route path="/users" render={(() => <UsersConainer />)} />
            <Redirect to="/profile" />
            </Switch>
            </Suspense>
          </div>
        </div>
      )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = connect(mapStateToProps, { initializeApp })(App);

const MainApp = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  )
}

export default MainApp