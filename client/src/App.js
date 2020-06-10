import React, { Fragment } from 'react';
import { Switch, Router } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import jwt_decode from 'jwt-decode';
import setJWTToken from './security/setJWT';

import history from './history';
import Home from './components/Home';
import { SecureRoute } from './security/SecureRoute';
import LoginCustomer from './components/views/LoginCustomer';
import LoginDriver from './components/views/LoginDriver';
import LoginAdmin from './components/views/LoginAdmin';
import AdminDashboard from './components/admin/AdminDashboard';
import { HeaderLayout } from './components/HeaderLayout';
import DriverManagement from './components/admin/tables/DriverManagement';
import CustomerManagement from './components/admin/tables/CustomerManagement';
import DeliveryManagement from './components/admin/tables/DeliveryManagement';

const App = () => {
  const token = localStorage.getItem('token');

  if (token) {
    setJWTToken(token);

    const decodedToken = jwt_decode(token);

    const current_time = Date.now() / 1000;

    if (decodedToken.exp < current_time) {
      localStorage.clear();
      setJWTToken(false);
      window.location.href = '/';
    }
  }

  return (
    <Fragment>
      <ReduxToastr />
      <Router history={history}>
        <Switch>
          <HeaderLayout path='/' exact component={Home} />
          <HeaderLayout
            path='/register-customer'
            exact
            component={LoginCustomer}
          />
          <HeaderLayout path='/register-driver' exact component={LoginDriver} />
          <HeaderLayout path='/login-admin' exact component={LoginAdmin} />
          <SecureRoute
            path='/admin-dashboard'
            exact
            component={AdminDashboard}
          />
          <SecureRoute
            path='/admin-drivers'
            exact
            component={DriverManagement}
          />
          <SecureRoute
            path='/admin-customers'
            exact
            component={CustomerManagement}
          />
          <SecureRoute
            path='/admin-deliveries'
            exact
            component={DeliveryManagement}
          />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
