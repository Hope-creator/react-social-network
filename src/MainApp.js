import React, { Suspense } from "react";
import "./App.scss";
import Navbar from "./parts/Navbar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";
import Header from "./parts/Header";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { connect, Provider } from "react-redux";
import { authThunks, authSelectors } from "./modules/auth/index";
import Preloader from "./parts/Preloader";
import store from "./redux/redux-store";
import ResetPassword from "./pages/ResetPassword";
import socket from "./socket";
import { withCookies } from "react-cookie";
import NoMatch from "./parts/NoMatch";
import ErrorBoundary from "./parts/ErrorBoundary";
import Verified from "./pages/Verified";
import Verify from "./pages/Verify";
import Users from "./pages/Users";
import { appSelectors, appThunks } from "./modules/app/index";

//lazy load
const Dialogs = React.lazy(() => import("./pages/Dialogs"));
const News = React.lazy(() => import("./pages/News"));
const Friends = React.lazy(() => import("./pages/Friends"));

class App extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      session: cookies.get("session") || "undefined",
      isNavHidden: false,
    };
  }

  componentDidMount() {
    this.props.initializeApp();
    socket.on("unreadConversations", (unreadConversations) => {
      this.props.unreadConversationsSubcribeThunk(unreadConversations);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      if (this.props.id && this.state.session !== "undefined")
        this.onUserInitialize(this.state.session);
    }
  }

  onUserInitialize = (session) => {
    socket.auth = { session };
    socket.connect();
  };

  changeVisibleNav = () => {
    this.setState({ isNavHidden: !this.state.isNavHidden });
  };

  render() {
    return !this.props.initialized ? (
      <Preloader />
    ) : (
      <div className="appWrapper">
        <Header
          changeVisibleNav={this.changeVisibleNav}
          isNavHidden={this.state.isNavHidden}
        />
        <Navbar
          unreadConversations={this.props.unreadConversations}
          isNavHidden={this.state.isNavHidden}
          changeVisibleNav={this.changeVisibleNav}
        />
        <div className="appWrapper__content">
          <Suspense fallback={<Preloader />}>
            <Switch>
              <Redirect exact from="/" to="/profile" />
              <Route path="/join" render={() => <Registration />} />
              <Route path="/reset" render={() => <ResetPassword />} />
              <Route path="/verify" render={() => <Verify />} />
              <Route path="/verified" render={() => <Verified />} />
              <Route path="/login" render={() => <Login />} />
              <Route path="/dialogs/:userId?" render={() => <Dialogs />} />
              <Route path="/profile/:userId?" render={() => <Profile />} />
              <Route path="/news" render={() => <News />} />
              <Route path="/friends" render={() => <Friends />} />
              <Route path="/users" render={() => <Users />} />
              <Route render={() => <NoMatch />} />
            </Switch>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: appSelectors.selectIsInitialized(state),
  id: authSelectors.selectAuthId(state),
  unreadConversations: authSelectors.selectUnreadConversationsCount(state),
});

const AppContainer = connect(mapStateToProps, {
  initializeApp: appThunks.initializeApp,
  unreadConversationsSubcribeThunk: authThunks.unreadConversationsSubcribeThunk,
})(withCookies(App));

const MainApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary>
          <AppContainer />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
