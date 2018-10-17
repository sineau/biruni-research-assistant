import { fork, select, call, put, all, take } from 'redux-saga/effects'

import getBookmarkState from '../utils/bookmarks-helpers'
import { getStorageLocal, setStorageKey, getBookmarksTree } from '../utils/storage-helpers'
import { rootFolders } from './selectors'
import { doHydrateBookmarks, doFetchToggled, doHydrateInfo } from './actions'
import * as actions from './action-types'

export function* fetchBookmarks() {
  try {
    const tree = yield call(getBookmarksTree)
    const data = yield call(getBookmarkState, tree)
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

export function* updateTree() {
  while(true){
    try {
      yield take(actions.update_tree)
      yield call(fetchBookmarks)
    } catch(e) {
      yield put({type: 'ERROR_GET_TREE', message: e.message})
    }
  }
}

export function* initSagas() {
  try{
    yield call(fetchBookmarks)
    yield all([
      call(fetchToggled),
      call(fetchBookmarksInfo)
    ])
    yield fork(updateTree)
  } catch(e) {
    yield put({type:'ERROR_INIT', message: e.message})
  }
}
