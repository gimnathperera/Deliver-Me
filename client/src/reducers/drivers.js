import _ from 'lodash';
import {
  FETCH_DRIVERS,
  DELETE_DRIVERS,
  STATUS_CHANGE_DRIVER,
  ADD_DRIVER
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_DRIVERS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case DELETE_DRIVERS:
      return _.omit(state, action.payload);
    case STATUS_CHANGE_DRIVER:
      return { ...state, [action.payload.id]: action.payload };
    case ADD_DRIVER:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
