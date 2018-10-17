import { doUpdateTree } from '../store/actions'
import { store } from '../store/store'

function handleUpdate() {
  return () => store.dispatch(doUpdateTree())
}
browser.bookmarks.onCreated.addListener(handleUpdate())
browser.bookmarks.onChanged.addListener(handleUpdate())
browser.bookmarks.onMoved.addListener(handleUpdate())
browser.bookmarks.onRemoved.addListener(handleUpdate())
browser.bookmarks.onChildrenReordered.addListener(handleUpdate())
