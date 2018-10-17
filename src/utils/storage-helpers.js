export function getStorageLocal(key) {
  return browser.storage.local.get(key)
}

export function setStorageKey(action) {
  if(typeof(action) === 'object') {
    browser.storage.local.set(action)
  } else {
    throw "action should be an object"
  }

}
export function getBookmarksTree() {
  return browser.bookmarks.getTree().then(r => r)
}
