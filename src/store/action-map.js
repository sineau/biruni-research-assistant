import * as action from './actions'
import * as type from './action-types'

export default {
  [type.toggle_folder]: action.doToggleFolder,
  [type.focus_folder]: action.doFocusFolder,
  [type.toggle_bookmark]: action.doToggleBookmark,
  [type.fetch_bookmarks]: action.doFetchBookmarks,
  [type.hydrate_bookmarks]: action.doHydrateBookmarks,
  [type.fetch_toggled]: action.doFetchToggled,
  [type.hydrate_info]: action.doHydrateInfo,
  [type.fetch_info]: action.doFetchInfo,
  [type.set_note]: action.doSetNote,
  [type.set_tag]: action.doSetTag,
  [type.set_storage_info]: action.doSetStorageInfo
}
