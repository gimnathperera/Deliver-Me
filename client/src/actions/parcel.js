import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { FETCH_PARCELS, EDIT_PARCELS, DELETE_PARCEL } from './types';

export const fetchAllParcels = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/parcels`);
    dispatch({ type: FETCH_PARCELS, payload: response.data });
  } catch (err) {
    console.log(err.message);
    toastr.error('Error', 'Server error');
  }
};

export const statusChange = (parcel_id, status) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/parcels/parcel/${parcel_id}`, {
      status
    });
    toastr.success('Success', 'Status changed successfully');

    dispatch({ type: EDIT_PARCELS, payload: response.data });
  } catch (err) {
    console.log(err.message);
    toastr.error('Error', 'Server error');
  }
};

export const deleteParcel = (parcel_id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/parcels/admin/${parcel_id}`);
    if (response) {
      toastr.success('Success', 'Deleted successfull');
      dispatch({ type: DELETE_PARCEL, payload: parcel_id });
    }
  } catch (err) {
    console.log(err.message);
    toastr.error('Error', 'Server error');
  }
};
