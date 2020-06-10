import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import signin from '../../assets/img/team/signin-image.jpg';

import '../../assets/css/login.css';

import { adminSignIn } from '../../actions';
import LoginFormAdmin from '../forms/LoginFormAdmin';

export class LoginAdmin extends Component {
  onSignIn = (credentials) => {
    this.props.adminSignIn(credentials);
  };

  render() {
    return (
      <Fragment>
        <div class={`sign-in`}>
          <div class='containers'>
            <div class='signin-content' style={{ paddingTop: 100 }}>
              <div class='signin-image'>
                <figure>
                  <img src={signin} alt='sing up image' />
                </figure>
              </div>

              <div class='signin-form' style={{ paddingTop: 20 }}>
                <h2
                  class='form-title'
                  style={{ color: 'black', fontWeight: 500 }}
                >
                  Sign in Admin
                </h2>
                <LoginFormAdmin onSubmit={this.onSignIn} />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { adminSignIn })(LoginAdmin);
