import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import _ from 'lodash';
export class SignupFormCustomer extends Component {
  renderField = ({ input, label, icon, type, meta: { touched, error } }) => {
    return (
      <div className='form-group'>
        <div style={{ position: 'absolute', marginTop: 18 }}>
          <label for={label}>
            <i className={icon}></i>
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

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit)}
        className='register-form'
        id='register-form'
      >
        {/* <div className='text-center'>
          <h1>Sign In</h1>
          <p className='text-muted'>Sign in to your account</p>
        </div> */}
        <Field
          name='fullName'
          type='text'
          component={this.renderField}
          label='Your Name'
          icon='fa fa-user'
        />
        <Field
          name='username'
          type='email'
          component={this.renderField}
          label='Your Email'
          icon='fa fa-envelope'
        />

        <Field
          name='password'
          type='password'
          component={this.renderField}
          label='Password'
          icon='fa fa-lock'
        />
        <Field
          name='confirmPassword'
          type='password'
          component={this.renderField}
          label='Repeat your password'
          icon='fas fa-redo-alt'
        />
        <div className='form-group'>
          <input
            type='checkbox'
            name='remember-me'
            id='remember-me'
            className='agree-term'
          />
          <label for='remember-me' className='label-agree-term'>
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
          Sign Up
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
  } else if (values.password.length < 6) {
    errors.password = 'Password should be minimum 6 characters';
  }
  if (!values.fullName) {
    errors.fullName = 'Required';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords should be matched';
  }
  return errors;
};

export default reduxForm({
  form: 'SignupFormCustomer',
  validate
})(SignupFormCustomer);
