import * as type from '../action-types'

function applyToggleBookmark(state,action) {
  return state === action.id ? '' : action.id
}
function ViewReducer(state='', action) {
  switch(action.type) {
    case type.toggle_bookmark: {
      return applyToggleBookmark(state,action)
    }
    default: return state
  }
}

export default ViewReducer
