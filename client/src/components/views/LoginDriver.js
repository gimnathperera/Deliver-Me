import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import signin from '../../assets/img/team/signin-image.jpg';
import signup from '../../assets/img/team/signup-image.jpg';
import '../../assets/css/login.css';
import LoginFormDriver from '../forms/LoginFormDriver';
import SignupFormDriver from '../forms/SignupFormDriver';
import { driverSignUp, driverSignIn } from '../../actions';

export class LoginDriver extends Component {
  state = {
    visibleSignin: '',
    visibleSignUp: 'none'
  };

  setVisible = () => {};

  onSignUp = (newDriver) => {
    _.assign(newDriver, { type: 'driver', status: 1 });
    this.props.driverSignUp(newDriver);
  };

  onSignIn = (credentials) => {
    this.props.driverSignIn(credentials);
  };

  render() {
    return (
      <Fragment>
        <div class={`sign-in`}>
          <div class='containers' style={{ display: this.state.visibleSignin }}>
            <div class='signin-content '>
              <div class='signin-image'>
                <figure>
                  <img src={signin} alt='sing up image' />
                </figure>
                <a
                  href='#'
                  class='signup-image-link'
                  onClick={() => {
                    this.setState({
                      visibleSignUp: '',
                      visibleSignin: 'none'
                    });
                  }}
                >
                  Create an account
                </a>
              </div>

              <div class='signin-form'>
                <h2
                  class='form-title'
                  style={{ color: 'black', fontWeight: 500 }}
                >
                  Sign in as driver
                </h2>
                <LoginFormDriver onSubmit={this.onSignIn} />

                <div class='social-login'>
                  <span class='social-label'>Or login with</span>
                  <ul class='socials' style={{ marginTop: 15 }}>
                    <li>
                      <a href='#'>
                        <i
                          class='display-flex-center fab fa-facebook fa-2x'
                          style={{ color: 'black' }}
                        ></i>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <i
                          class='display-flex-center fab fa-twitter'
                          style={{ color: 'black' }}
                        ></i>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <i
                          class='display-flex-center fab fa-google'
                          style={{ color: 'black' }}
                        ></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class={`signup`}>
          <div class='containers' style={{ display: this.state.visibleSignUp }}>
            <div class='signup-content'>
              <div class='signup-form'>
                <h2 class='form-title' style={{ color: 'black' }}>
                  Sign up as driver
                </h2>
                <SignupFormDriver onSubmit={this.onSignUp} />
              </div>
              <div class='signup-image'>
                <figure>
                  <img src={signup} alt='sing up image' />
                </figure>
                <a
                  href='#'
                  class='signup-image-link'
                  onClick={() => {
                    this.setState({
                      visibleSignUp: 'none',
                      visibleSignin: ''
                    });
                  }}
                >
                  I already have an account
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { driverSignUp, driverSignIn })(LoginDriver);
