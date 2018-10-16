import React from 'react'
import { connect } from 'react-redux'

import { itemsState, focusState } from '../../store/selectors'
import { doToggleBookmark } from '../../store/actions'

import { ItemStyled, ItemButton } from '../styles/bookmarks-styled'

const ItemList = ({item,id,onClick}) => {
  const {title,url} = item
  return(
    <ItemStyled>
      <div id={id}>
        <div className="item-title">{title}</div>
        <div className="item-url"><a target="_blank" href={url}>Visit Site</a></div>
        <ItemButton onClick={() => onClick(id)}>View Details</ItemButton>
      </div>
    </ItemStyled>
  )
}

const BookmarksViewDry = ({ focus, bookmarks, onOpen }) => {
  return(
    <div>
      <h2>List</h2>
      <div>
        {bookmarks ? Object.keys(bookmarks)
                           .filter(id => focus ? focus === bookmarks[id].parentId : true)
                           .map(id => (<ItemList id={id} key={id}
                                                 item={bookmarks[id]}
                                                 onClick={onOpen} />))
         : <div>Wait</div>}
      </div>
    </div>
  )
}

const BookmarksStateToProps = (state) => ({
  focus: focusState(state),
  bookmarks: itemsState(state),
})

const BookmarksDispatchToProps = (dispatch) => ({
  onOpen: id => dispatch(doToggleBookmark(id))
})

const BookmarksView = connect(BookmarksStateToProps, BookmarksDispatchToProps)(BookmarksViewDry)

export default BookmarksView
