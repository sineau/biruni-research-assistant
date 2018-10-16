import { combineReducers } from 'redux'

import ToggleReducer from './toggle'
import FocusReducer from './focus'
import ViewReducer from './view'
import BookmarksReducer from './bookmarks'
import InfoReducer from './info'

const RootReducer = combineReducers({
  ToggleState: ToggleReducer,
  FocusState: FocusReducer,
  ViewState: ViewReducer,
  BookmarksState: BookmarksReducer,
  InfoState: InfoReducer
})

export default RootReducer
