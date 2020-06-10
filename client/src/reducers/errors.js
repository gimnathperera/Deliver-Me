import { SET_ERRORS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errmsgs: action.payload
      };
    default:
      return state;
  }
};
