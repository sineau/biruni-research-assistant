import test  from 'tape'

import { bookmarks, state, normalized } from './state-data'
import  getBookmarkState  from '../src/utils/bookmarks-helpers'


test("Helpers: getBookmarksState", function(t) {
  let actual = getBookmarkState(bookmarks)
  let expected = normalized
  t.deepEqual(actual, expected, "Should normalize bookmarks state")
  t.end()
})
