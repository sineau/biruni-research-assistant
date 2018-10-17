import * as type from './action-types.js'

export function doToggleFolder({id}) {
  return {
    type: type.toggle_folder,
    id
  }
}
export function doFocusFolder({id}) {
  return {
    type: type.focus_folder,
    id
  }
}
export function doToggleBookmark({id}) {
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

export function doSetNote({id,notes}) {
//  const payload = {id: id, notes: notes}
  console.log('note payload', {id,notes})
  return {
    type: type.set_note,
    id,
    notes,
  }
}

export function doSetTag({id, tags}) {
  return {
    type: type.set_tag,
    id,
    tags
  }
}

export function doSetStorageInfo({data}) {
  return {
    type: type.set_storage_info,
    data
  }
}

export function doUpdateTree() {
  return {
    type: type.update_tree
  }
}
