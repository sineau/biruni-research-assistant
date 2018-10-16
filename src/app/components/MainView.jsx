import React from 'react'
import { connect } from 'react-redux'

import ItemView from './ItemView'
import BookmarksView from './BookmarksView'
import { viewState } from '../../store/selectors'

import { MainStyled } from '../styles/app-styled'

const MainViewDry = ({view}) => {
  return(
    <MainStyled>
      {view ? <ItemView view={view} /> : <BookmarksView />}
    </MainStyled>
  )
}

const MainStateToProps = (state) => ({
 view: viewState(state)
})

const MainView = connect(MainStateToProps)(MainViewDry)

export default MainView
