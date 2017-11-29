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
import GroupSelect from './container/GroupSelect';
import GroupCreate from './container/GroupCreate';
import Toolbar from './container/toolbar';
import Login from './container/Login';
import { Settings } from './container/Settings'; 

import { UserIsAuthenticated, UserIsNotAuthenticated } from './container/UserAuthenticated';
import LoadingWrapper from './container/LoadingWrapper';

import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const routes = [
  {
    path: "/login",
    exact: false,
    component: Login,
    onlyNotAuthenticated: true
  },
  {
    path: "/",
    exact: true,
    component: GroupSelect,
    onlyAuthenticated: true
  },
  {
    path: "/settings",
    exact: true,
    component: Settings,
    onlyAuthenticated: true
  },
  {
    path: "/calender",
    exact: true,
    component: Home,
    onlyAuthenticated: true
  },
  {
    path: "/create",
    exact: true,
    component: GroupCreate,
    onlyAuthenticated: true
  },

  {
    path: "/test",
    exact: true,
    component: () => <h1>Hei</h1>,
    onlyAuthenticated: true
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