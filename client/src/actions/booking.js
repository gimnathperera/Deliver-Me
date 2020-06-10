import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import {
  ADD_PARCEL_BOOKING,
  FETCH_USER_BOOKINGS,
  DELETE_USER_BOOKINGS,
  STATUS_CHANGE_USER_BOOKINGS
} from './types';

export const createBooking = (newBooking) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/parcels`, newBooking);
    toastr.success('Success', 'Booking successfully created');
    dispatch({ type: ADD_PARCEL_BOOKING, payload: response.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchUserBookings = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/parcels/all`);
    dispatch({ type: FETCH_USER_BOOKINGS, payload: response.data });
  } catch (err) {
    console.log(err.message);
  }
};

export const deletUserBooking = (booking_id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/parcels/${booking_id}`);

    if (!response.data.msg) {
      toastr.success('Success', 'Booking is deleted successfully');
      dispatch({ type: DELETE_USER_BOOKINGS, payload: booking_id });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const statusChangeBooking = (booking_id, status) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/parcels/${booking_id}`, { status });
    if (!response.data.id) {
      toastr.error('Sorry', 'Booking is not found');
    }
    toastr.success('Success', 'Status changed successfully');
    dispatch({ type: STATUS_CHANGE_USER_BOOKINGS, payload: response.data });
  } catch (err) {
    console.log(err.message);
    toastr.error('Error', 'Status can not be changed');
  }
};
