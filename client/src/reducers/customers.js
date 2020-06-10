import _ from 'lodash';
import { FETCH_CUSTOMERS, DELETE_CUSTOMERS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case DELETE_CUSTOMERS:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
