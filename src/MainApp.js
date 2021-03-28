import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import UsersConainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Auth/Login/Login';
import Registration from './components/Auth/Join/Registration';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { unreadConversationsSubcribeThunk } from './redux/auth-reducer'
import Preloader from './components/common/preloader/Preloader';
import store from './redux/redux-store';
import AccountVerifiedSuccess from './components/Auth/Join/AccountVerifiedSuccess';
import ResetPassword from './components/Auth/ResetPassword';
import socket from './socket';
import { withCookies } from 'react-cookie';
import NoMatch from './utils/utils-components/NoMatch';
import ErrorBoundary from './utils/utils-components/ErrorBoundary';




//lazy load
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const NewsContainer = React.lazy(() => import('./components/News/NewsContainer'));
const FriendsContainer = React.lazy(() => import('./components/Friends/FriendsContainer'));



class App extends React.Component {

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      session: cookies.get("session") || "undefined",
      isNavHidden: false
    }
  }

  componentDidMount() {
    this.props.initializeApp();
    socket.on("unreadConversations", (unreadConversations) => {
      this.props.unreadConversationsSubcribeThunk(unreadConversations)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      if (this.props.id &&
        this.state.session !== "undefined") this.onUserInitialize(this.state.session);
    }
  }

  onUserInitialize = (session) => {
    socket.auth = { session };
    socket.connect();
  }

  changeVisibleNav = () => {
    this.setState({ isNavHidden: !this.state.isNavHidden })
  }

  render() {
    return !this.props.initialized ? <Preloader /> :
        (<div className="app-wrapper">
          <HeaderContainer
            changeVisibleNav={this.changeVisibleNav}
            isNavHidden={this.state.isNavHidden}
          />
          <Navbar
            unreadConversations={this.props.unreadConversations}
            isNavHidden={this.state.isNavHidden}
            changeVisibleNav={this.changeVisibleNav}
          />
          <div className="app-wrapper-content">
            <Suspense fallback={<Preloader />}>
              <Switch>
                <Redirect exact from="/" to="/profile" />
                <Route path="/join" render={(() => <Registration />)} />
                <Route path="/reset" render={(() => < ResetPassword />)} />
                <Route path="/verified" render={(() => <AccountVerifiedSuccess />)} />
                <Route path="/login" render={(() => <Login />)} />
                <Route path="/dialogs/:userId?" render={(() => <DialogsContainer />)} />
                <Route path="/profile/:userId?" render={(() => <ProfileContainer />)} />
                <Route path="/news" render={(() => <NewsContainer />)} />
                <Route path="/friends" render={(() => <FriendsContainer />)} />
                <Route path="/users" render={(() => <UsersConainer />)} />
                <Route render={(() => <NoMatch />)} />
              </Switch>
            </Suspense>
          </div>
        </div>
      )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  id: state.auth.id,
  unreadConversations: state.auth.unreadConversations
})

const AppContainer = connect(mapStateToProps,
  { initializeApp, unreadConversationsSubcribeThunk })(withCookies(App));

const MainApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary>
          <AppContainer />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  )
}

export default MainApp