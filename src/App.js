import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import UsersConainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/preloader/Preloader';
import store from './redux/redux-store';


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
          learn react
          <div className="app-wrapper-content">
            <Suspense fallback={<Preloader />}>
            <Route path="/login" render={(() => <Login />)} />
            <Route path="/dialogs" render={(() => <DialogsContainer />)} />
            <Route path="/profile/:userId?" render={(() => <ProfileContainer />)} />
            <Route path="/news" render={(() => <News />)} />
            <Route path="/music" render={(() => <Music />)} />
            <Route path="/users" render={(() => <UsersConainer />)} />
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
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default MainApp