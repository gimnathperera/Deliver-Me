import _ from 'lodash';
import {
  FETCH_CUSTOMERS,
  DELETE_CUSTOMERS,
  STATUS_CHANGE_CUSTOMER
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case DELETE_CUSTOMERS:
      return _.omit(state, action.payload);
    case STATUS_CHANGE_CUSTOMER:
      return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
};
