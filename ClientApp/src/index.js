import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'
import io from 'socket.io-client'
import App from './components/App/App'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(() => {}, composeEnhancers(applyMiddleware(thunkMiddleware)
));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
const socket = io('/')
    	
  socket.on('connect', function () {

  })
registerServiceWorker()
