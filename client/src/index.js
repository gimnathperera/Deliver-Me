import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

import './index.css';
import App from './App';
import './assets/css/animate.min.css';
import './assets/css/bootstrap.min.css';
import './assets/css/flaticon.css';
import './assets/css/fontawesome-all.min.css';
// import './assets/css/gijgo.css';
import './assets/css/magnific-popup.css';
import './assets/css/nice-select.css';
import './assets/css/owl.carousel.min.css';
// import './assets/css/responsive.css';
import './assets/css/slick.css';
import './assets/css/slicknav.css';
import './assets/css/style.css';
import './assets/css/themify-icons.css';
import './assets/css/aos.css';
import './assets/css/hover-min.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
