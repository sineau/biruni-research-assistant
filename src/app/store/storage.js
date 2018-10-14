export function getStorageLocal(key) {
  return browser.storage.local.get(key)
}
