import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store/store'
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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
