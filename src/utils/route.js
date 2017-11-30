import React from 'react';
import { Route, Router } from 'react-router'
import { UserIsAuthenticated, UserIsNotAuthenticated } from './container/UserAuthenticated';

export const getRoute = (route, idx) => {
    const { exact, path, onlyAuthenticated, onlyNotAuthenticated } = route;
    let component = route.component;
    if (onlyAuthenticated){
      component = UserIsAuthenticated(route.component);
    } else if (onlyNotAuthenticated) {
      component = UserIsNotAuthenticated(route.component);
    }
  
    return <Route key={`${idx}-${path}`} exact={exact || false} path={path} component={component} />;
  };
  