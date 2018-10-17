import '@babel/polyfill'
import { normalize, schema } from 'normalizr'

var subfolderStack =[]

/* Map Bookmarks */
function mapBookmarks(node) {
  const { id, title, dateAdded, url, parentId } = node
  let a = {
    id,
    title,
    dateAdded,
    url,
    parentId
  }
  return a
}

function mapFolders(node) {
  let { id, title, dateAdded, parentId = '', dateGroupModified } = node
  /* filter check for url added becuase chrome doesn't have node type' */
  let bookmarks = node.children
                      .filter(n => n.type === 'bookmark' ||
                                 (n.url && !n.url.match(/^data:/) ))
                      .filter(n => (n.title !== 'Recent Tags' &&
                                    n.title !== 'Most Visited' &&
                                    n.title !== 'Recently Bookmarked'))
                      .map(mapBookmarks)
  let subfolders = node.children
                       .filter(n => n.type === 'folder' || !n.url)
                       .map(n => {
                         subfolderStack.push(n)
                         return n.id
                       })
  let folder = {
    id,
    title,
    dateAdded,
    parentId,
    dateGroupModified,
    bookmarks,
    subfolders
  }
  return folder
}

/* Normalized */
const bookmark = new schema.Entity('bookmarks')
const folders = new schema.Entity('folders', {
  bookmarks: [bookmark]
})

folders.define({
  subfolders: [folders],
})

export default function getBookmarkState(node) {
  let tree = node.map(mapFolders)
  while(subfolderStack.length > 0) {
    let i = subfolderStack.length - 1
    let newTree = mapFolders(subfolderStack.pop(i))
    tree.push(newTree)
  }
  return normalize(tree, [folders])
}
