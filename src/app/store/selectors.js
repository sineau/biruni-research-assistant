export const toggleState = (state) => state.ToggleState,
             allFolders = (state) => state.BookmarksState.entities.folders,
             currentFolder = (state,id) => state.BookmarksState.entities.folders[id]

export const rootFolders = (state) => {
  const folders = allFolders(state)
  return Object.keys(folders).filter(i => folders[i].id === 'root________')
}

export const viewState = (state) => state.ViewState,
             focusState = (state) => state.FocusState,
             itemsState = (state) => state.BookmarksState.entities.bookmarks,
             itemState = (state, id) => state.BookmarksState.entities.bookmarks[id],
             notesState = (state,id) => {
               const info = state.InfoState
               return (info[id] && info[id].notes) || {}
             },
             tagsState = (state,id) => {
               const info = state.InfoState
               return (info[id] && info[id].tags) || []
             }
