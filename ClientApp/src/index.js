import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import './index.css';
import App from './Components/App/App';
import rootReducer from './Reducers/reducers'
import registerServiceWorker from './registerServiceWorker';
import io from 'socket.io-client';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
const socket = io('http://localhost:5000/');
    	
  socket.on('connect', function () {

  })
registerServiceWorker();
