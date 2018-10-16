import * as type from './action-types.js'

export function doToggleFolder(id) {
  return {
    type: type.toggle_folder,
    id
  }
}
export function doFocusFolder(id) {
  return {
    type: type.focus_folder,
    id
  }
}
export function doToggleBookmark(id) {
  return {
    type: type.toggle_bookmark,
    id
  }
}

export function doFetchBookmarks() {
  return {
    type: type.fetch_bookmarks
  }
}
export function doHydrateBookmarks(data) {
  return {
    type: type.hydrate_bookmarks,
    data
  }
}
export function doFetchToggled(toggled) {
  return {
    type: type.fetch_toggled,
    toggled
  }
}

export function doHydrateInfo(data) {
  return {
    type: type.hydrate_info,
    data
  }
}

export function doDehydrateInfo(data) {
  return {
    type: type.dehydrate_info,
    data
  }
}

export function doFetchInfo(data) {
  return {
    type: type.fetch_info,
    data
  }
}

export function doSetNote(data) {
  return {
    type: type.set_note,
    payload: data
  }
}

export function doSetTag(data) {
  return {
    type: type.set_tag,
    payload: data
  }
}

export function doSetStorageInfo(data) {
  return {
    type: type.set_storage_info,
    data
  }
}
