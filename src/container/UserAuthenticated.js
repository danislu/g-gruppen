import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import /*CircularProgress*/ LoadingScreen from 'material-ui/CircularProgress';
import { compose } from 'recompose';
import { isEmpty, isLoaded } from 'react-redux-firebase';

const locationHelper = locationHelperBuilder({});

const authenticatingSelector = ({ firebase: { isInitializing, auth } }) => 
  isInitializing === true || !isLoaded(auth);

export const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/login',
  allowRedirectBack: true,
  authenticatedSelector: ({ firebase: { auth } }) => isLoaded(auth) && !isEmpty(auth),
  authenticatingSelector,
  AuthenticatingComponent: LoadingScreen,
  wrapperDisplayName: 'UserIsAuthenticated',
});

export const UserIsNotAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  AuthenticatingComponent: LoadingScreen,
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  authenticatedSelector: ({ firebase: { auth } }) => isLoaded(auth) && isEmpty(auth),
  authenticatingSelector
});
