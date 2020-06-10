import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const checkToken = () => {
  let jwtToken = localStorage.getItem('token');
  if (jwtToken !== null) {
    if (localStorage.getItem('role') === 'admin') {
      return true;
    }
    return false;
  }
  return false; //should be false
};

export const SecureRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (checkToken()) {
          console.log(checkToken());
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
