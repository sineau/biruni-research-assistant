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
  let bookmarks = node.children
                      .filter(n => n.type === 'bookmark')
                      .filter(n => (n.title !== 'Recent Tags' &&
                                    n.title !== 'Most Visited' &&
                                    n.title !== 'Recently Bookmarked'))
                      .map(mapBookmarks)
  let subfolders = node.children
                       .filter(n => n.type === 'folder')
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
function mapTree(node) {
  let tree = node.map(mapFolders)
  while(subfolderStack.length > 0) {
    let i = subfolderStack.length - 1
    let newTree = mapFolders(subfolderStack.pop(i))
    tree.push(newTree)
  }
  return tree
}

function getBookmarkState(bookmarks) {
  return Promise.resolve(bookmarks).then(
    (r) => {
      return mapTree(r)
    },
    (e) => console.log('error in getBookmarkState', e)
  )
}

/* Normalized */
const bookmark = new schema.Entity('bookmarks')
const folders = new schema.Entity('folders', {
  bookmarks: [bookmark]
})

folders.define({
  subfolders: [folders],
})

function getBookmarkNormalized(state) {
  return Promise.resolve(state).then(
    (result) =>  normalize(result, [folders]),
    (error) => console.log('error in normalization', error)
  )
}

export { getBookmarkNormalized, getBookmarkState }
