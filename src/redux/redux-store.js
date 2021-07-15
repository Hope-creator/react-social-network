import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import authReducer from "../modules/auth";
import dialogsReducer from "../modules/dialogs";
import profileReducer from "../modules/profile";
import usersReducer from "../modules/users";
import appReducer from "../modules/app";
import newsReducer from "../modules/news";
import friendsReducer from "../modules/friends";

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  newsPage: newsReducer,
  friendsPage: friendsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
