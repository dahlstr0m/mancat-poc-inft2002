import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../services/auth-service';

/**
 * Used to protect various routes from non-authenticated users.
 * Non-authenticated users are redirected to the login page.
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const authenticated = authService.isAuthenticated();
      if (!authenticated) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/login' }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

export default ProtectedRoute;
