import { select, call, put, all, take } from 'redux-saga/effects'

import { getBookmarkNormalized, getBookmarkState } from './bookmarks'
import { getStorageLocal, setStorageKey } from './storage'
import { rootFolders } from './selectors'
import { doHydrateBookmarks, doFetchToggled, doHydrateInfo } from './actions'
import * as actions from './action-types.js'
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

export function* fetchBookmarksInfo(action = []) {
  try {
    const info = yield call(getStorageLocal, action)
    yield put(doHydrateInfo(info))
  } catch(e) {
    yield put({type: 'ERROR_INFO_FETCH', message: e.message})
  }
}

export function* setBookmarkInfo(action) {
  try {
    yield take(actions.set_storage_info)
    yield call(setStorageKey,action)
  } catch(e) {
    yield put({type: 'ERROR_SET_INFO', message: e.message})
  }
}
export function* initSagas() {
  try{
    const getTree = (typeof browser !== 'undefined') ? browser.bookmarks.getTree() : bookmarks
    yield call(fetchBookmarks,getTree)
    yield all([
      call(fetchToggled),
      call(fetchBookmarksInfo)
    ])
  } catch(e) {
    yield put({type:'ERROR_INIT', message: e.message})
  }
}
