import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import _ from 'lodash';

import history from '../../history';

export class LoginFormCustomer extends Component {
  state = {
    err: ''
  };

  componentDidMount() {
    if (localStorage.getItem('token')) {
      history.push('/');
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.errmsgs !== prevProps.errmsgs) {
      this.setState({ err: 'Invalid credentials' });
    }
  }

  renderField = ({ input, label, icon, type, meta: { touched, error } }) => {
    return (
      <div className='form-group'>
        <div style={{ position: 'absolute', marginTop: 18 }}>
          <label for={label}>
            <i class={icon}></i>
          </label>
        </div>

        <input
          {...input}
          type={type}
          placeholder={label}
          autoComplete='off'
          style={{ width: '100%', height: 35 }}
        />
        {touched && error && (
          <span className='form-text text-muted' style={{ display: 'block' }}>
            <small style={{ color: 'red' }}>{error}</small>
          </span>
        )}
      </div>
    );
  };
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  render() {
    const { handleSubmit } = this.props;
    let errDisplay;
    if (this.state.err) {
      errDisplay = (
        <span className='form-text text-muted' style={{ marginBottom: 10 }}>
          <small style={{ color: 'red' }}>{this.state.err}</small>
        </span>
      );
    } else {
      errDisplay = null;
    }

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit)}
        class='register-form'
        id='login-form'
      >
        {/* <div className='text-center'>
          <h1>Sign In</h1>
          <p className='text-muted'>Sign in to your account</p>
        </div> */}

        <Field
          name='username'
          type='email'
          component={this.renderField}
          label='Email'
          icon='fa fa-user'
        />

        <Field
          name='password'
          type='password'
          component={this.renderField}
          label='Password'
          icon='fa fa-lock'
        />
        <div class='form-group'>
          <input
            type='checkbox'
            name='remember-me'
            id='remember-me'
            class='agree-term'
          />
          {errDisplay}
          <label for='remember-me' class='label-agree-term'>
            <span style={{ marginBottom: 5 }}></span>Remember me
          </label>
        </div>

        <button
          type='submit'
          className='btn btn-success'
          style={{
            display: 'block',
            width: '100%',
            fontSize: 18,
            marginTop: 20,
            border: '1px solid white'
          }}
        >
          Sign In
        </button>
      </form>
    );
  }
}
const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
  ) {
    errors.username = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    errmsgs: state.errmsgs
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'LoginFormCustomer',
    validate
  })(LoginFormCustomer)
);
