import _ from 'lodash';
import { FETCH_ALL_DELIVERIES, ACCEPT_DELIVERY } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_DELIVERIES:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case ACCEPT_DELIVERY:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
