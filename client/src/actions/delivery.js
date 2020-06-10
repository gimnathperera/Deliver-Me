import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {
  FETCH_ALL_DELIVERIES,
  STATUS_CHANGE_DELIVERIES,
  ACCEPT_DELIVERY,
  FETCH_ALL_DELIVERIES_BY_DRIVER
} from './types';

export const fetchAllDeliveries = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/parcels`);
    dispatch({ type: FETCH_ALL_DELIVERIES, payload: response.data });
  } catch (err) {
    console.log(err.message);
    toastr.error('Error', 'Server error');
  }
};

export const fetchAllDeliveriesForADriver = (driver_id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/parcels/delivery/${driver_id}`);
    dispatch({ type: FETCH_ALL_DELIVERIES_BY_DRIVER, payload: response.data });
  } catch (err) {
    console.log(err.message);
    toastr.error('Error', 'Server error');
  }
};

export const statusChangeDelivery = (delivery_id, status) => async (
  dispatch
) => {
  try {
    const response = await axios.put(`/api/parcels/parcel/${delivery_id}`, {
      status
    });
    if (!response.data.id) {
      toastr.error('Sorry', 'Delivery is not found');
    }
    toastr.success('Success', 'Status changed successfully');
    dispatch({ type: STATUS_CHANGE_DELIVERIES, payload: response.data });
  } catch (err) {
    console.log(err.message);
    toastr.error('Error', 'Status could not be changed');
  }
};

export const acceptDelivery = (delivery_id, delivery) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/parcels/delivery/${delivery_id}`, {
      status: delivery.status,
      driver_name: delivery.driver_name
    });
    if (!response.data.id) {
      toastr.error('Sorry', 'Delivery is not found');
    }
    toastr.success('Success', 'Delivery has been accepted successfully');
    dispatch({ type: ACCEPT_DELIVERY, payload: response.data });
    window.location.href = '/';
  } catch (err) {
    console.log(err.message);
    toastr.error('Error', 'Status could not be changed');
  }
};
