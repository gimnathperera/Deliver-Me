import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import signin from '../../assets/img/team/signin-image.jpg';
import signup from '../../assets/img/team/signup-image.jpg';
import '../../assets/css/login.css';
import LoginFormCustomer from '../forms/LoginFormCustomer';
import SignupFormCustomer from '../forms/SignupFormCustomer';
import { customerSignUp, customerSignIn } from '../../actions';

export class LoginCustomer extends Component {
  state = {
    visibleSignin: '',
    visibleSignUp: 'none'
  };

  setVisible = () => {};

  onSignUp = (newCustomer) => {
    _.assign(newCustomer, { type: 'customer' });
    this.props.customerSignUp(newCustomer);
  };

  onSignIn = (credentials) => {
    this.props.customerSignIn(credentials);
  };

  render() {
    let animation = '';

    return (
      <Fragment>
        <div class={`sign-in`}>
          <div class='containers' style={{ display: this.state.visibleSignin }}>
            <div class='signin-content'>
              <div class='signin-image'>
                <figure>
                  <img src={signin} alt='sing up image' />
                </figure>
                <a
                  href='#'
                  class='signup-image-link '
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
                  Sign in
                </h2>
                <LoginFormCustomer onSubmit={this.onSignIn} />

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
                  Sign up
                </h2>
                <SignupFormCustomer onSubmit={this.onSignUp} />
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

export default connect(null, { customerSignUp, customerSignIn })(LoginCustomer);
