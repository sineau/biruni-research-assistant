import test from 'tape'
import { take, put, call, select } from 'redux-saga/effects'

import getBookmarkState from '../src/utils/bookmarks-helpers'
import { getStorageLocal, setStorageKey, getBookmarksTree } from '../src/utils/storage-helpers'
import { doHydrateBookmarks, doFetchToggled, doHydrateInfo } from '../src/store/actions'
import { fetchToggled, fetchBookmarks, fetchBookmarksInfo, setBookmarkInfo, updateTree } from '../src/store/sagas'
import { rootFolders } from '../src/store/selectors'

test("Saga: fetchBookmarks", t => {
  const gen = fetchBookmarks()
  const actual = gen.next().value
  const expected = call(getBookmarksTree)
  t.deepEqual(actual, expected, 'Should yield to getBookmarksTree')

  const actual1 = gen.next([]).value
  const expected1 = call(getBookmarkState,{})
  t.deepEqual(actual1, expected1, 'Should yield to getBookmarksState')

  const actual3 = gen.next({}).value
  const expected3 = put(doHydrateBookmarks({}))
  t.deepEqual(actual3,expected3, 'Should yield to doAddBookmarks')

  t.end()
})

test("Saga: fetchToggled", t => {
  const gen = fetchToggled()
  const actual1 = gen.next().value
  const expected1 = select(rootFolders)
  t.deepEqual(actual1, expected1, 'Should yield to selecting rootFolders')

  const actual2 = gen.next([]).value
  const expected2 = put(doFetchToggled([]))
  t.deepEqual(actual2, expected2, 'Should yield to doFetchToggled')

  t.end()
})

test("Saga: fetchBookmarksInfo", t => {
  const gen = fetchBookmarksInfo()
  const actual1 = gen.next().value
  const expected1 = call(getStorageLocal,[])
  t.deepEqual(actual1, expected1, 'Should yield to getStorageLocal')

  const actual2 = gen.next({}).value
  const expected2 = put(doHydrateInfo({}))
  t.deepEqual(actual2, expected2, 'Should yield to doAddInfo')
  t.end()
})

test("Saga: setBookmarkInfo", t => {
  const id = 'X7pv4tRIPM9v'
  const gen = setBookmarkInfo(id)
  const actual1 = gen.next().value
  const expected1 = take('SET_STORAGE_INFO')
  t.deepEqual(actual1, expected1, 'Should take SET_STORAGE_INFO action')
  const actual2 = gen.next().value
  const expected2 = call(setStorageKey, id)

  t.deepEqual(actual2, expected2, 'Should set bookmark key')
  t.end()
})

test("Sagas: UpdateTree", t => {
  const gen = updateTree()
  const actual1 = gen.next().value
  const expected1 = take('UPDATE_TREE')
  t.deepEqual(actual1, expected1, 'Should take UPDATE_TREE')
  const actual2 = gen.next().value
  const expected2 = call(fetchBookmarks)
  t.deepEqual(actual2, expected2, 'Should yield to fetchBookmarks')

  t.end()
})
