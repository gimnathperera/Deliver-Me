import _ from 'lodash';
import {
  FETCH_ALL_DELIVERIES_BY_DRIVER,
  STATUS_CHANGE_DELIVERIES
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_DELIVERIES_BY_DRIVER:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case STATUS_CHANGE_DELIVERIES:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
