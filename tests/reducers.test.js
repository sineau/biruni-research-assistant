import test from 'tape'
import deepFreeze from 'deep-freeze'

import ToggleReducer from '../src/app/store/reducers/toggle.js'
import FocusReducer from '../src/app/store/reducers/focus.js'
import ViewReducer from '../src/app/store/reducers/view.js'
import BookmarksReducer from '../src/app/store/reducers/bookmarks.js'
import InfoReducer from '../src/app/store/reducers/info'

import { normalized } from './state-data.js'

const folderIds = ['root________', 'menu________', 'mqOlBB4jIAa6']
const bookmarkIds = ['v85IAOGM1NQe', '','4NJsHEpKdUdL']

test("Reducer: update focus state", t => {
  let id = folderIds
  const action1 = {
    type: 'FOCUS_FOLDER',
    id: id[1]
  }
  let prevState1 = id[2]
  const expected1 = id[1]
  deepFreeze(prevState1)

  const actual1 = FocusReducer(prevState1, action1)
  t.deepEqual(actual1, expected1, 'Should change focused folder from one to another')
  const action2 = {
    type: 'FOCUS_FOLDER',
    id: id[0]
  }
  let prevState2 = ""
  const expected2 = id[0]
  deepFreeze(prevState2)

  const actual2 = FocusReducer(prevState2, action2)
  t.deepEqual(actual2, expected2, 'Should change focused folder from empty to something')

  const action3 = {
    type: 'FOCUS_FOLDER',
    id: ""
  }
  let prevState3 = id[1]
  const expected3 = ""
  deepFreeze(prevState3)

  const actual3 = FocusReducer(prevState3, action3)
  t.deepEqual(actual3, expected3, 'Should change focused folder from something to empty')

  t.end()
})

test("Reducer: updates view state", t => {
  let id = bookmarkIds
  const action1 = {
    type: 'TOGGLE_BOOKMARK',
    id: id[1]
  }
  const prevState1 = id[0]
  deepFreeze(prevState1)

  const expected1 = id[1]
  const actual1 = ViewReducer(prevState1, action1)
  t.deepEqual(actual1, expected1, 'Should change focused bookmark from something to another')

  const action2 = {
    type: 'TOGGLE_BOOKMARK',
    id: id[2]
  }
  const prevState2 = ""
  deepFreeze(prevState2)

  const expected2 = id[2]
  const actual2 = ViewReducer(prevState2, action2)
  t.deepEqual(actual2, expected2, 'Should change focused bookmark from empty to something')

  const action3 = {
    type: 'TOGGLE_BOOKMARK',
    id: ""
  }
  const prevState3 = id[1]
  deepFreeze(prevState3)

  const expected3 = ""
  const actual3 = ViewReducer(prevState3, action3)
  t.deepEqual(actual3, expected3, 'Should change focused bookmark from something to empty')

  t.end()
})

test("Reducer: add to toggle state", t => {
  let id = folderIds
  let toggled = 'hVa55cpOPaK1'
  const action = {
    type: 'TOGGLE_FOLDER',
    id: toggled
  }
  const prevState = id
  deepFreeze(prevState)

  const expected = [...id, toggled]
  const actual = ToggleReducer(prevState, action)
  t.deepEqual(actual, expected, 'Should add folders to toggleState by Id')
  t.end()
})

test("Reducer: remove from toggle state", t => {
  t.plan(3)
  let toggled = 'hVa55cpOPaK1'
  let ids1 = [...folderIds, toggled]
  let ids2 = [toggled, ...folderIds]
  let ids3 = [...folderIds.slice(0,2), toggled, folderIds[2]]
  const action = {
    type: 'TOGGLE_FOLDER',
    id: toggled
  }

  const expected = [...folderIds]
  deepFreeze(ids1)
  const actual1 = ToggleReducer(ids1, action)
  deepFreeze(ids2)
  const actual2 = ToggleReducer(ids2, action)
  deepFreeze(ids3)
  const actual3 = ToggleReducer(ids3, action)

  t.deepEqual(actual1, expected, 'Should remove folder from end of ToggleState')
  t.deepEqual(actual2, expected, 'Should remove folder from start of ToggleState')
  t.deepEqual(actual3, expected, 'Should remove folder from middle of ToggleState')
})

test("Reducer: fetch toggle state", t => {
  const action = {
    type: 'FETCH_TOGGLED',
    toggled: folderIds
  }
  const prevState = []
  deepFreeze(prevState)
  const actual = ToggleReducer(prevState, action)
  const expected = folderIds

  t.deepEqual(actual, expected, 'Should fetch toggleState from rootFolder')
  t.end()
})

test("Reducer: hydrate bookmark state", t => {
  const action = {
    type: 'HYDRATE_BOOKMARKS',
    data: normalized
  }
  const prevState = []
  deepFreeze(prevState)
  const expected = normalized
  const actual = BookmarksReducer(prevState, action)

  t.deepEqual(actual, expected, 'Should hydrate state from API')
  t.end()
})

test("Reducer: hydrate bookmark info state", t => {
  const data = {
    'v85IAOGM1NQe': {
      tags: ['a','b','c'],
      notes: {1: 'w', 2:'x', 3:'y'},
      authors: ['e', 'f']
    }
  }
  const action = {
    type: 'HYDRATE_INFO',
    data
  }
  const prevState = []
  deepFreeze(prevState)
  const actual = InfoReducer(prevState, action)
  const expected = data
  t.deepEqual(actual,expected, 'Shoud hydrate info state from API')
  t.end()
})

test("Reducer: add tags to bookmark", t => {
  const action = {
    type: 'SET_TAG',
    payload: {
      id: 'v85IAOGM1NQe',
      tags: ['d', 'e']
    }
  }
  const prevState = {
    'v85IAOGM1NQe': {
      notes: {1: 'w', 2:'x', 3:'y'},
      tags: ['a','b','c'],
    }
  }
  deepFreeze(prevState)
  const expected = {
    'v85IAOGM1NQe': {
      notes: {1: 'w', 2:'x', 3:'y'},
      tags: ['a','b','c', 'd', 'e'],
    }
  }
  const actual = InfoReducer(prevState, action)
  t.deepEqual(actual, expected, 'Should add tags to a bookmark')
  t.end()
})

test("Reducer: add notes to bookmark", t => {
  const action1 = {
    type: 'SET_NOTE',
    payload: {
      id: 'v85IAOGM1NQe',
      notes: {4: 'd', 5: 'e'}
    }
  }
  const action2 = {
    type: 'SET_NOTE',
    payload: {
      id: 'v85IAOGM1NQe',
      notes: {1: 'd', 2: 'e'}
    }
  }
  const prevState = {
    'v85IAOGM1NQe': {
      notes: {1: 'w', 2:'x', 3:'y'}
    }
  }
  deepFreeze(prevState)
  const expected = {
    'v85IAOGM1NQe': {
      notes: {1: 'w', 2:'x', 3:'y', 4: 'd', 5: 'e'},
    }
  }
  const actual = InfoReducer(prevState, action1)
  t.deepEqual(actual, expected, 'Should add note to a bookmark')

  const prevState2 = {}
  deepFreeze(prevState2)
  const expected2 = {
    'v85IAOGM1NQe': {
      notes: {1: 'd', 2: 'e'},
    }
  }
  const actual2 = InfoReducer(prevState2, action2)
  t.deepEqual(actual2, expected2, 'Should add note if bookmark doesn`t exists')
  t.end()
})
