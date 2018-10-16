import * as type from '../action-types'

function applyFocusFolder(state,action) {
  return action.id
}
function FocusReducer(state='', action) {
  switch(action.type) {
    case type.focus_folder: {
      return applyFocusFolder(state, action)
    }
    default: return state
  }
}

export default FocusReducer
