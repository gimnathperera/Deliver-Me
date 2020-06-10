import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastr } from 'react-redux-toastr';

import errmsgs from './errors';
import security from './security';
import bookings from './bookings';
import deliveries from './deliveries';
import acceptions from './acceptions';
import customers from './customers';
import drivers from './drivers';
import parcels from './parcels';

export default combineReducers({
  security,
  toastr,
  errmsgs,
  bookings,
  deliveries,
  acceptions,
  customers,
  drivers,
  parcels,
  form: formReducer
});
