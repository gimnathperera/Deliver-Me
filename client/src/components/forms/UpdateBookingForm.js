import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { createBooking } from '../../actions/booking';

export class UpdateBookingForm extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.bookings !== prevProps.bookings) {
      this.onSuccessSubmission();
    }
  }

  onSuccessSubmission = () => {
    this.props.destroy('UpdateBookingForm');
    this.props.onCancel();
  };

  onCancel = () => {
    this.props.destroy('UpdateBookingForm');
    this.props.onCancel();
  };

  onSubmit = (formValues) => {
    let convertedWeight = formValues.weight + 'kg';
    let updatedBooking = {
      id: this.props.booking_id,
      location: formValues.location,
      destination: formValues.destination,
      weight: convertedWeight,
      status: 1,
      qty: 1
    };

    this.props.createBooking(updatedBooking);
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

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className='form-group row'>
          <Field
            name='location'
            type='text'
            component={this.renderField}
            label='From: '
          />
        </div>
        <div className='form-group row'>
          <Field
            name='destination'
            type='text'
            component={this.renderField}
            label='To: '
          />
        </div>
        <div className='form-group row'>
          <Field
            name='weight'
            type='number'
            component={this.renderField}
            label='Weight(kg): '
          />
        </div>
        <div class='ant-modal-footer' style={{ marginTop: 10 }}>
          <div>
            <button type='button' class='ant-btn' onClick={this.onCancel}>
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

  if (!values.location) {
    errors.location = 'Required';
  }
  if (!values.destination) {
    errors.destination = 'Required';
  }
  if (!values.weight) {
    errors.weight = 'Required';
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    bookings: state.bookings
  };
};

export default connect(mapStateToProps, { createBooking })(
  reduxForm({
    form: 'UpdateBookingForm',
    validate
  })(UpdateBookingForm)
);
