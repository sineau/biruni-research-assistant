import * as type from '../action-types'
function applyHydrateInfo(state,action) {
  return action.data
}
function applyAddInfo(state,{ type: actionType, id, tags = [], notes = {} }) {
//  const { id, tags, notes } = args
  const item = state[id] || {}
  let updatedItem
  switch(actionType) {
    case type.set_tag: {
      const currentTags = item['tags'] || []
      const newTags = [...currentTags, ...tags]
      updatedItem = {...item, tags: newTags}
      break
    }
    case type.set_note: {
      const currentNotes = item['notes'] || {}
      const newNotes = {...currentNotes, ...notes}
      updatedItem = {...item, notes: newNotes}
      break
    }
    default: return null
  }
  return {...state, [id]: updatedItem}
}

function InfoReducer(state={}, action) {
  switch(action.type) {
    case type.hydrate_info: {
      return applyHydrateInfo(state,action)
    }
    case type.set_tag: {
      return applyAddInfo(state,action)
    }
    case type.set_note: {
      return applyAddInfo(state,action)
    }
    default: return state
  }

}

export default InfoReducer
