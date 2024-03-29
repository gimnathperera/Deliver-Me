import { SET_CURRENT_CUSTOMER } from '../actions/types';

const initialState = {
  user: {},
  validToken: false
};

const booleanActionPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CUSTOMER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};
