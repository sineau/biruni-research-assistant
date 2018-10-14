import { select, call, put } from 'redux-saga/effects'

import { getBookmarkNormalized, getBookmarkState } from './bookmarks'
import { getStorageLocal } from './storage'
import { rootFolders } from './selectors'
import { doHydrateBookmarks, doFetchToggled, doHydrateInfo } from './actions'

import { bookmarks } from '../../../tests/state-data.js'

export function* fetchBookmarks(action) {
  try {
    const bookmarks = yield call(getBookmarkState, action)
    const data = yield call(getBookmarkNormalized,bookmarks)
    yield put(doHydrateBookmarks(data))
  } catch(e) {
    yield put({type:'ERROR_BOOKMARK_FETCH', message: e.message})
  }
}
export function* fetchToggled() {
  const toggled = yield select(rootFolders)
  yield put(doFetchToggled(toggled))
}
export function* fetchBookmarksInfo() {
  try {
    const info = yield call(getStorageLocal, 'info')
    yield put(doHydrateInfo(info))
  } catch(e) {
    yield put({type: 'ERROR_INFO_FETCH', message: e.message})
  }
}
const initFetch = [fetchBookmarks, fetchToggled, fetchBookmarksInfo]
export function* initSagas() {
  for(let i in initFetch) {
    try{
      const action = (typeof browser !== 'undefined') ? browser.bookmarks.getTree() : bookmarks
      yield call(initFetch[i],action)
    } catch(e) {
      yield put({type:'ERROR_INIT', message: e.message})
    }
  }
}
