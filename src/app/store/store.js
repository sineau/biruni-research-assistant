import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'

import {initSagas, bookmarksSaga} from './sagas'
import RootReducer from './reducers'

const saga = createSagaMiddleware()
const logger = createLogger()
export const store = createStore(RootReducer,
                                 undefined,
                                 applyMiddleware(saga,logger))

saga.run(initSagas)
