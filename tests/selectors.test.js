import test from 'tape'

import { bookmarksState, currentFolder, full_state, folders } from './state-data'
import * as select from '../src/store/selectors'

test('Selectors: root folder', t => {
  const expected = [ 'root________' ]
  const actual =  select.rootFolders(full_state)

  t.deepEqual(actual, expected)
  t.end()
})

test('Selectors: toggle state', t => {
  const expected = ['root________', 'menu________', 'mqOlBB4jIAa6']
  const actual = select.toggleState(full_state)

  t.deepEqual(actual, expected)
  t.end()
})

test('Selectors: all bookmark folders', t => {
  const expected = folders
  const actual = select.allFolders(full_state)

  t.deepEqual(actual, expected)
  t.end()
})

test('Selectors: current folder', t => {
  const id = 'lDXaRSPKkddJ'
  const expected = currentFolder
  const actual = select.currentFolder(full_state, id)

  t.deepEqual(actual, expected)
  t.end()
})

test('Selectors: view state', t => {
  const expected = '4NJsHEpKdUdL'
  const actual = select.viewState(full_state)

  t.deepEqual(actual, expected)
  t.end()
})

test('Selectors: focus state', t => {
  const expected = 'mqOlBB4jIAa6'
  const actual = select.focusState(full_state)

  t.deepEqual(actual, expected)
  t.end()
})

test('Selectors: all bookmarks', t => {
  const expected = bookmarksState
  const actual = select.itemsState(full_state)

  t.deepEqual(actual, expected)
  t.end()
})

test('Selectors: current bookmark', t => {
  const id = 'X7pv4tRIPM9v'
  const expected = {
    id: 'X7pv4tRIPM9v',
    title: 'Wikipedia',
    dateAdded: 1538731355025,
    url: 'https://www.wikipedia.org/',
    parentId: 'hVa55cpOPaK1'
  }
  const actual = select.itemState(full_state,id)

  t.deepEqual(actual, expected)
  t.end()
})

test('Selectors: current bookmark notes', t => {
  const id = 'X7pv4tRIPM9v'
  const expected = {1: 'w', 2:'x', 3:'y'}
  const actual = select.notesState(full_state,id)

  t.deepEqual(actual, expected, 'Should select notes from infoState')
  t.end()
})

test('Selectors: current bookmark tags', t => {
  const id = 'X7pv4tRIPM9v'
  const expected = ['a','b','c']
  const actual = select.tagsState(full_state,id)

  t.deepEqual(actual, expected, 'Should select notes from infoState')
  t.end()
})
