import * as type from '../action-types'

function applyHydrateBookmarks(state,action) {
  return {
    entities: action.data.entities,
    result: action.data.result
  }
}
function BookmarksReducer(state={entities: {}, result: {}}, action) {
  switch(action.type) {
    case type.hydrate_bookmarks: {
      return applyHydrateBookmarks(state,action)
    }
    default: return state
  }
}

export default BookmarksReducer
