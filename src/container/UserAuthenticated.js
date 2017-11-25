import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { pathToJS } from 'react-redux-firebase';
import /*CircularProgress*/ LoadingScreen from 'material-ui/CircularProgress';

const locationHelper = locationHelperBuilder({});

const authenticatingSelector = ({ firebase }) => pathToJS(firebase, 'isInitializing') === true || pathToJS(firebase, 'auth') === undefined;

export const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/login',
  allowRedirectBack: true,
  authenticatedSelector: ({ firebase }) => pathToJS(firebase, 'auth') !== null,
  authenticatingSelector,
  AuthenticatingComponent: LoadingScreen,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  AuthenticatingComponent: LoadingScreen,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  authenticatedSelector: ({ firebase }) => pathToJS(firebase, 'auth') === null,
  authenticatingSelector
});