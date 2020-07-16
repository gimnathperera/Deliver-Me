import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import {
  FETCH_DRIVERS,
  DELETE_DRIVERS,
  ADD_DRIVER,
  STATUS_CHANGE_DRIVER
} from './types';

export const fetchDrivers = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/users/drivers`);

    dispatch({ type: FETCH_DRIVERS, payload: response.data });
  } catch (err) {
    console.log(err.messsage);
    toastr.error('Error', 'Server error');
  }
};

export const statusChange = (id, status) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/users/driver/${id}`, { status });
    toastr.success('Success', 'Status changed successfully');

    dispatch({ type: STATUS_CHANGE_DRIVER, payload: response.data });
  } catch (err) {
    console.log(err.message);
    toastr.error('Error', 'Server error');
  }
};

export const deleteDriver = (driver_id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/users/drivers/${driver_id}`);
    dispatch({ type: DELETE_DRIVERS, payload: driver_id });
  } catch (err) {
    console.log(err.messsage);
    toastr.error('Error', 'Server error');
  }
};

export const addDriver = (newDriver) => async (dispatch) => {
  console.log('addADriver -> newDriver', newDriver);
  try {
    const response = await axios.post(
      `api/customers/register-driver`,
      newDriver
    );
    toastr.success('Success', 'Account successfully created');
    window.location.href = '/admin-drivers';
    dispatch({ type: ADD_DRIVER, payload: response.data });
  } catch (err) {
    console.log(err.message);
    toastr.error('Error', 'Server error');
  }
};
