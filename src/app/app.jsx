import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createUIStore } from 'redux-webext'

import * as actions from '../store/actions'
import RenderTree from './components/Sidebar'
import MainView from './components/MainView'

import { AppStyled } from './styles/app-styled'
require('./styles/global.css')

const App = () => {
  console.log('app mounted')
  return(
    <AppStyled>
      <RenderTree />
      <MainView />
    </AppStyled>
  )
}

const ConnectedApp = connect(state => state, actions)(App)

async function init() {
  const store = await createUIStore()
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>,
    document.getElementById('root')
  )
}

init()
