import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {
  reactReduxFirebase,
  firebaseStateReducer,
  getFirebase
} from 'react-redux-firebase';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { reducer as formReducer } from 'redux-form';
import { config as firebaseConfig } from './../firebaseconfig';
import { epics, reducers } from './ducks';
import firebase from 'firebase';

const reduxFirebaseConfig = {
  userProfile: 'users',
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions', // where list of user sessions is stored in database (presence must be enabled)
  profileParamsToPopulate: ['walkers:users', 'users:users', 'creator:users']
};

firebase.initializeApp(firebaseConfig);

const history = createHistory();
const rootEpic = combineEpics(epics);
const middleware = [
  routerMiddleware(history),
  createEpicMiddleware(rootEpic, {
    dependencies: {
      getFirebase,
      history
    }
  })
];

// Add reactReduxFirebase store enhancer
const createStoreWithFirebase = compose(
  applyMiddleware(...middleware),
  reactReduxFirebase(firebase, reduxFirebaseConfig)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  ...reducers,
  firebase: firebaseStateReducer,
  routing: routerReducer,
  form: formReducer
});

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState, devTools);

export { store, history };
