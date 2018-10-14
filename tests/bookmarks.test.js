import {test as tape} from 'tape'
import _test from 'tape-promise'

import { bookmarks, state, normalized } from './state-data.js'
import {getBookmarkState, getBookmarkNormalized} from '../src/app/store/bookmarks.js'

const test = _test(tape)

test("It creates state from bookmarks", async function(t) {
  let actual = await getBookmarkState(bookmarks)
  t.deepEqual(actual, state)
  t.end()
})

test("It normalizes state", async function(t) {
  let actual = await getBookmarkNormalized(state)
  let expected = normalized
  t.deepEqual(actual, expected)
  t.end()
})
