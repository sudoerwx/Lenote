import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './reducers'

import RootRouter from './components/RootRouter/RootRouter'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

render(
	<Provider store={store}>
		<RootRouter />
	</Provider>,
	document.getElementById('root')
)

registerServiceWorker()
