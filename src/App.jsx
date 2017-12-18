import React from 'react';
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter as Router } from 'react-router-redux'
import './utils/momentsetup';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { store, history } from './state/store';
import Select from './container/GroupSelect';
import Create from './container/Create';
import Group from './container/Group';
import Info from './container/GroupInfo';
import Walkers from './components/Walkers';
import Toolbar from './container/Toolbar';
import Login from './container/Login';
import Contact from './components/Contact';
import Drawer from './components/Drawer';
import Invite from './components/Invite';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './container/UserAuthenticated';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const routes = [
  {
    path: "/login",
    exact: true,
    component: Login,
    onlyNotAuthenticated: true
  },
  {
    path: "/",
    exact: true,
    component: Select,
    onlyAuthenticated: true
  },
  {
    path: "/contact",
    exact: true,
    component: Contact,
    onlyAuthenticated: true
  },
  {
    path: "/create",
    exact: true,
    component: Create,
    onlyAuthenticated: true
  },
  {
    path: "/group/walker",
    exact: true,
    component: Walkers,
    onlyAuthenticated: true
  },
  {
    path: "/group",
    exact: true,
    component: Info,
    onlyAuthenticated: true
  },
  {
    path: "/group/kid",
    exact: true,
    component: Group,
    onlyAuthenticated: true
  },
  {
    path: "/test",
    exact: true,
    component: () => <h1>hoi</h1>,
    onlyAuthenticated: true
  },
  {
    path: "/invite/:id",
    exact: true,
    component: Invite,
    onlyAuthenticated: true
  }
];

const getRoute = (route, idx) => {
  const { exact, path, onlyAuthenticated, onlyNotAuthenticated } = route;
  let component = route.component;
  if (onlyAuthenticated){
    component = UserIsAuthenticated(route.component);
  } else if (onlyNotAuthenticated) {
    component = UserIsNotAuthenticated(route.component);
  }

  return <Route key={`${idx}-${path}`} exact={exact || false} path={path} component={component} />;
};

class App extends React.PureComponent {
  render() {
    return (
        <Provider store={store}>
          <Router history={history}>
            <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
            <div className="container">
              <div className="header">
                <Toolbar />
              </div>
              <div className="content">
              {
                routes.map(getRoute)
              }
              </div>
              <Drawer />
            </div>
            </MuiThemeProvider>
          </Router>
      </Provider>
    );
  }
}

export default App;