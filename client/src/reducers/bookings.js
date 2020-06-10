import _ from 'lodash';
import {
  ADD_PARCEL_BOOKING,
  FETCH_USER_BOOKINGS,
  DELETE_USER_BOOKINGS,
  STATUS_CHANGE_USER_BOOKINGS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_BOOKINGS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case ADD_PARCEL_BOOKING:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_USER_BOOKINGS:
      return _.omit(state, action.payload);
    case STATUS_CHANGE_USER_BOOKINGS:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
