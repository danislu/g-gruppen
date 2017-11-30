import React from 'react';
import { Provider } from 'react-redux'
import { Route, Router } from 'react-router'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { store, history } from './state/store';
import Select from './container/GroupSelect';
import Create from './container/Create';
import Info from './container/GroupInfo';
import Toolbar from './container/toolbar';
import Login from './container/Login';
import Contact from './components/Contact';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './container/UserAuthenticated';

import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
moment.locale('nb');
moment.updateLocale('nb', {
  calendar : {
      lastDay : '[Yesterday]',
      sameDay : '[I dag]',
      nextDay : '[I morgen]',
      lastWeek : '[Forrige] dddd',
      nextWeek : '[Neste] dddd',
      sameElse : 'L'
  }
});

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
    path: "/info/:id",
    exact: true,
    component: Info,
    onlyAuthenticated: true
  },
  {
    path: "/test",
    exact: true,
    component: () => <h1>Hei</h1>,
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