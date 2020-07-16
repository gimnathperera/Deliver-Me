import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toastr } from 'react-redux-toastr';
import emailjs from 'emailjs-com';

import {
  SET_CURRENT_CUSTOMER,
  SET_ERRORS,
  SET_CURRENT_DRIVER,
  SET_CURRENT_ADMIN
} from './types';
import setJWTToken from '../security/setJWT';

const mailData = {
  SERVICE_ID: 'gmail',
  USER_ID: 'user_6ERnjkuHObxLGaTSy2okE',
  TEMPLATE_ID: 'template_zFL7Vf5z'
};

export const customerSignUp = (newCustomer) => async (dispatch) => {
  try {
    const response = await axios.post(
      `api/customers/register-customer`,
      newCustomer
    );

    toastr.success('Success', 'Account successfully created');
    setInterval(() => {
      window.location.href = '/register-customer';
    }, 1000);
  } catch (err) {
    console.log(err.message);
    toastr.error('Error', 'Server error');
  }
};

export const customerSignIn = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      `/api/customers/login-customer`,
      credentials
    );
    //getting the token
    const { token } = response.data;

    //setting the token to local storage
    localStorage.setItem('token', token);

    //setting the token to headers **
    setJWTToken(token);

    //decoding the token using the jwt-decode library
    const decodedToken = jwt_decode(token);
    localStorage.setItem('id', decodedToken.id);
    localStorage.setItem('username', decodedToken.username);

    //dispatch the decoded token to the global state of the application
    dispatch({ type: SET_CURRENT_CUSTOMER, payload: decodedToken });
    window.location.href = '/';
  } catch (err) {
    console.log(err.response.data);
    // toastr.error('Error', 'Invalid credentials');
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

export const adminSignIn = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      `/api/customers/login-admin`,
      credentials
    );
    //getting the token
    const { token } = response.data;

    //setting the token to local storage
    localStorage.setItem('token', token);

    //setting the token to headers **
    setJWTToken(token);

    //decoding the token using the jwt-decode library
    const decodedToken = jwt_decode(token);
    localStorage.setItem('id', decodedToken.id);
    localStorage.setItem('username', decodedToken.username);
    localStorage.setItem('role', decodedToken.type);

    //dispatch the decoded token to the global state of the application
    dispatch({ type: SET_CURRENT_ADMIN, payload: decodedToken });
    window.location.href = '/admin-dashboard';
  } catch (err) {
    console.log(err.message);
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

export const driverSignUp = (newDriver) => async (dispatch) => {
  try {
    const response = await axios.post(
      `api/customers/register-driver`,
      newDriver
    );
    toastr.success('Success', 'Account successfully created');
    setInterval(() => {
      window.location.href = '/register-driver';
    }, 1000);
  } catch (err) {
    console.log(err.message);
    toastr.error('Error', 'Server error');
  }
};

export const driverSignIn = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      `/api/customers/login-driver`,
      credentials
    );
    //getting the token
    const { token } = response.data;

    //setting the token to local storage
    localStorage.setItem('token', token);

    //setting the token to headers **
    setJWTToken(token);

    //decoding the token using the jwt-decode library
    const decodedToken = jwt_decode(token);
    localStorage.setItem('id', decodedToken.id);
    localStorage.setItem('username', decodedToken.username);

    //dispatch the decoded token to the global state of the application
    dispatch({ type: SET_CURRENT_DRIVER, payload: decodedToken });
    window.location.href = '/';
  } catch (err) {
    console.log(err.response.data);
    // toastr.error('Error', 'Invalid credentials');
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

export const sendEmail = (data) => async (dispatch) => {
  console.log('sendEmail -> data', data);
  try {
    var template_params = {
      reply_to: 'Admin',
      from_name: data.fullName,
      to_name: data.username,
      message_html: `<p>${data.message}</p>`
    };
    const response = await emailjs.send(
      mailData.SERVICE_ID,
      mailData.TEMPLATE_ID,
      template_params,
      mailData.USER_ID
    );
    if (response) {
      toastr.success('Success', 'Your feedback has been recorded, Thank you!');
      window.location.href = '/';
    }
  } catch (err) {
    console.log(err.message);
    toastr.error('Error', 'Server error');
  }
};
