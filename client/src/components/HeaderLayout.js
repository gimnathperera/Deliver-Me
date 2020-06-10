import React, { Fragment } from 'react';

import { Route } from 'react-router-dom';
import Header from './Header';

export const HeaderLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Fragment>
        <Header />
        <Component {...props} />
      </Fragment>
    )}
  />
);
