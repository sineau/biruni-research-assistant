import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBackgroundStore } from 'redux-webext'
import { createLogger } from 'redux-logger'

import { initSagas } from './sagas'
import RootReducer from './reducers'
import actions from './action-map'

const saga = createSagaMiddleware()
const logger = createLogger()
const store = createStore(RootReducer,
                                 undefined,
                                 applyMiddleware(saga,logger))
saga.run(initSagas)

export const backgroundStore = createBackgroundStore({ store, actions })
