import test from 'tape'
import { take, put, call, select } from 'redux-saga/effects'

import { getBookmarkState, getBookmarkNormalized } from '../src/app/store/bookmarks'
import { getStorageLocal } from '../src/app/store/storage'
import { doHydrateBookmarks, doFetchToggled, doHydrateInfo } from '../src/app/store/actions'
import { fetchToggled, fetchBookmarks, fetchBookmarksInfo } from '../src/app/store/sagas.js'
import { rootFolders } from '../src/app/store/selectors'

test("Saga: fetchBookmarks from bookmarks API", t => {
  const gen = fetchBookmarks([])
  const actual1 = gen.next().value
  const expected1 = call(getBookmarkState, [])
  t.deepEqual(actual1, expected1, 'Should yield to getBookmarksState')

  const actual2 = gen.next([]).value
  const expected2 = call(getBookmarkNormalized, [])
  t.deepEqual(actual2, expected2, 'Should yield to getBookmarknormalized')

  const actual3 = gen.next({}).value
  const expected3 = put(doHydrateBookmarks({}))
  t.deepEqual(actual3,expected3, 'Should yield to doAddBookmarks')

  t.end()
})

test("Saga: fetchToggled from root folder", t => {
  const gen = fetchToggled()
  const actual1 = gen.next().value
  const expected1 = select(rootFolders)
  t.deepEqual(actual1, expected1, 'Should yield to selecting rootFolders')

  const actual2 = gen.next([]).value
  const expected2 = put(doFetchToggled([]))
  t.deepEqual(actual2, expected2, 'Should yield to doFetchToggled')

  t.end()
})

test("Saga: fetchBookmarksInfo from storage API", t => {
  const gen = fetchBookmarksInfo()
  const actual1 = gen.next().value
  const expected1 = call(getStorageLocal,[])
  t.deepEqual(actual1, expected1, 'Should yield to getStorageLocal')

  const actual2 = gen.next({}).value
  const expected2 = put(doHydrateInfo({}))
  t.deepEqual(actual2, expected2, 'Should yield to doAddInfo')
  t.end()
})

test("Saga: save bookmark info to storage", t => {
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
