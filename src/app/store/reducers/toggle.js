import * as type from '../action-types'

function applyAddToggled(state,action) {
  return action.toggled
}
function applyToggleFolder(state,action) {
  let ind = state.indexOf(action.id)
  return (ind !== -1) ?
         [...state.slice(0,ind), ...state.slice(ind+1)]
       : state.concat(action.id)
}

function ToggleReducer(state=[], action) {
  switch(action.type) {
    case type.toggle_folder: {
      return applyToggleFolder(state, action)
    }
    case type.fetch_toggled: {
      return applyAddToggled(state, action)
    }
    default: return state
  }
}

export default ToggleReducer
