import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { FETCH_DRIVERS, DELETE_DRIVERS } from './types';

export const fetchDrivers = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/users/drivers`);
    dispatch({ type: FETCH_DRIVERS, payload: response.data });
  } catch (err) {
    console.log(err.messsage);
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
