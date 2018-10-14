import test from 'tape'

import * as actions from '../src/app/store/actions.js'
import { normalized } from './state-data.js'
const folderIds = ['root________', 'menu________', 'mqOlBB4jIAa6']

test("Action: toggle folder", (t) => {
  let id = folderIds
  t.plan(3)
  for(let i in id) {
    const expected = {
      type: 'TOGGLE_FOLDER',
      id: id[i]
    }
    const actual = actions.doToggleFolder(id[i])
    t.deepEqual(actual, expected, 'Should toggle a folder by Id')
  }
})

test("Action: focus folder", t => {
  let id = folderIds
  t.plan(3)
  for(let i in id) {
    const expected = {
      type: 'FOCUS_FOLDER',
      id: id[i]
    }
    const actual = actions.doFocusFolder(id[i])
    t.deepEqual(actual, expected, 'Should focus a folder by Id')
  }
})

test("Action: toggle bookmark", t => {
  const bookmarkId = ['','4NJsHEpKdUdL']
  t.plan(2)
  for(let i in bookmarkId) {
    const expected = {
      type: 'TOGGLE_BOOKMARK',
      id: bookmarkId[i]
    }
    const actual = actions.doToggleBookmark(bookmarkId[i])
    t.deepEqual(actual, expected, 'Should toggle a bookmark by Id')
  }
})

test("Action: fetch bookmarks", t=> {
  const expected = {
    type: 'FETCH_BOOKMARKS'
  }
  const actual = actions.doFetchBookmarks()
  t.deepEqual(actual, expected, 'Should fetch bookmarks from API')
  t.end()
})

test("Action: Rehydrate bookmarks to state", t => {
  const expected = {
    type: 'HYDRATE_BOOKMARKS',
    data: normalized
  }
  const actual = actions.doHydrateBookmarks(normalized)
  t.deepEqual(actual, expected, 'Shoud add bookmarks from API to state')
  t.end()
})

test("Action: fetch toggled", t => {
  const expected = {
    type: 'FETCH_TOGGLED',
    toggled: folderIds
  }
  const actual = actions.doFetchToggled(folderIds)
  t.deepEqual(actual, expected, 'Should fetch toggled from root folder')
  t.end()
})

test("Action: Rehydrate bookmark info to state", t => {
  const expected = {
    type: 'HYDRATE_INFO',
    data: {}
  }
  const actual = actions.doHydrateInfo({})
  t.deepEqual(actual, expected, 'Should add bookmark info from API to state')
  t.end()
})

test("Action: Dehydrate bookmark info to local storage", t => {
  const expected = {
    type: 'DEHYDRATE_INFO',
    data: {}
  }
  const actual = actions.doDehydrateInfo({})
  t.deepEqual(actual, expected, 'Should push bookmark info from state to storage')
  t.end()
})

test("Action: fetch bookmarks from local storage", t => {
  const expected = {
    type: 'FETCH_INFO',
    data: {}
  }
  const actual = actions.doFetchInfo({})
  t.deepEqual(actual, expected, 'Should fetch bookmark info from storage to state')
  t.end()
})

test("Action: set note", t => {
  const expected = {
    type: 'SET_NOTE',
    payload: {
      id: 'v85IAOGM1NQe',
      note: 'd'
    }
  }
  const actual = actions.doSetNote({
    id: 'v85IAOGM1NQe',
    note: 'd'
  })
  t.deepEqual(actual, expected, 'Should add a new note')
  t.end()
})

test("Action: set tags", t => {
  const expected = {
    type: 'SET_TAG',
    payload: {
      id: 'v85IAOGM1NQe',
      tags: ['d']
    }
  }
  const actual = actions.doSetTag({
    id: 'v85IAOGM1NQe',
    tags: ['d']
  })
  t.deepEqual(actual, expected, 'Should add a new note')
  t.end()
})
