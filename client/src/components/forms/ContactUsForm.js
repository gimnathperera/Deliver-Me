import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { connect } from 'react-redux';
import { sendEmail } from '../../actions';

export class ContactUsForm extends Component {
  renderTextArea = ({
    input,
    label,
    placeholder,
    meta: { touched, error }
  }) => {
    return (
      <Fragment>
        <div className='col-2'>
          <label style={{ paddingLeft: 10 }}>{label}</label>
        </div>
        <div className='col-10'>
          <textarea
            {...input}
            placeholder={placeholder}
            className='form-control'
          />
          {touched && error && (
            <span className='form-text text-muted'>
              <small style={{ color: 'red' }}>{error}</small>
            </span>
          )}
        </div>
      </Fragment>
    );
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <Fragment>
        <div className='col-2'>
          <label style={{ paddingLeft: 10 }}>{label}</label>
        </div>
        <div className='col-10'>
          <input
            {...input}
            type={type}
            className='form-control'
            // autoComplete='off'
            style={{ height: 35 }}
          />
          {touched && error && (
            <span className='form-text text-muted'>
              <small style={{ color: 'red' }}>{error}</small>
            </span>
          )}
        </div>
      </Fragment>
    );
  };

  onSubmit = (formValues) => {
    this.props.sendEmail(formValues);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className='form-group row'>
          <Field
            name='fullName'
            type='text'
            component={this.renderField}
            label='Full Name'
            icon='fa fa-user'
          />
        </div>
        <div className='form-group row'>
          <Field
            name='username'
            type='email'
            component={this.renderField}
            label='Email'
            icon='fa fa-envelope'
          />
        </div>

        <div className='form-group row'>
          <Field
            name='message'
            type='text'
            component={this.renderTextArea}
            label='Message'
            icon='fa fa-lock'
          />
        </div>
        <div class='ant-modal-footer' style={{ marginTop: 10 }}>
          <div>
            <button type='button' class='ant-btn' onClick={this.props.onCancel}>
              <span>Cancel</span>
            </button>
            <button type='submit' class='ant-btn ant-btn-primary'>
              <span>Submit</span>
            </button>
          </div>
        </div>
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
  if (!values.message) {
    errors.message = 'Required';
  }
  if (!values.fullName) {
    errors.fullName = 'Required';
  }

  return errors;
};
export default connect(null, { sendEmail })(
  reduxForm({
    form: 'ContactUsForm',
    validate
  })(ContactUsForm)
);
