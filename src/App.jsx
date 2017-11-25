import React from 'react';
import { Provider } from 'react-redux'
import { Route, Router } from 'react-router'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { store, history } from './state/store';
import Home from './container/home';
import Toolbar from './container/toolbar';
import Login from './container/Login';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './container/UserAuthenticated';
import LoadingWrapper from './container/LoadingWrapper';

import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    onlyAuthenticated: true
  },
  {
    path: "/login",
    exact: false,
    component: Login,
    onlyNotAuthenticated: true
  }
];

const getRoute = (route) => {
  const { exact, path, onlyAuthenticated, onlyNotAuthenticated } = route;
  let component = route.component;
  if (onlyAuthenticated){
    component = UserIsAuthenticated(route.component);
  } else if (onlyNotAuthenticated) {
    component = UserIsNotAuthenticated(route.component);
  }

  return <Route exact={exact || false} path={path} component={component} />;
};

class App extends React.PureComponent {
  render() {
    return (
        <Provider store={store}>
          <Router history={history}>
            <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
            <div>
              <Toolbar />
              {
                routes.map(getRoute)
              }
            </div>
            </MuiThemeProvider>
          </Router>
      </Provider>
    );
  }
}

export default App;