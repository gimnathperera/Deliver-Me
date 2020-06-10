import _ from 'lodash';
import { FETCH_PARCELS, EDIT_PARCELS, DELETE_PARCEL } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_PARCELS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case EDIT_PARCELS:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_PARCEL:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
