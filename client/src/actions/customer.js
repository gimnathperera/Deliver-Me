import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import { FETCH_CUSTOMERS, DELETE_CUSTOMERS } from './types';

export const fetchCustomers = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/users/customers`);
    dispatch({ type: FETCH_CUSTOMERS, payload: response.data });
  } catch (err) {
    console.log(err.messsage);
    toastr.error('Error', 'Server error');
  }
};

export const deleteCustomer = (customer_id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/users/customers/${customer_id}`);
    dispatch({ type: DELETE_CUSTOMERS, payload: customer_id });
  } catch (err) {
    console.log(err.messsage);
    toastr.error('Error', 'Server error');
  }
};
