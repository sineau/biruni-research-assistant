import React from 'react'
import { connect } from 'react-redux'

import { itemState, notesState, tagsState } from '../../store/selectors'
import { doToggleBookmark, doSetNote, doSetTag, doSetStorageInfo } from '../../store/actions'

import AddNote from './ItemNotes'
import AddTags from './ItemTags'

const Annotation = ({ notes }) => {
  return(
    <div>
      <div>Notes</div>
      {Object.keys(notes).map(i => <div key={`note-${i}`}>{notes[i]}</div>)}
    </div>
  )
}
const TagsList = ({ tags }) => {
  return(
    <div>
      <div>Notes</div>
      <ul>
        {Object.keys(tags).map(i => <li key={`tag-${i}`}>{tags[i]}</li>)}
      </ul>
    </div>
  )
}

class ItemViewDry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: this.props.notes || {},
      tags: this.props.tags || []
    }
    this.addNote = this.addNote.bind(this)
    this.addTags = this.addTags.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  addNote(newNote) {
    const { notes: oldNotes } = this.state
    const num = Object.keys(oldNotes).length + 1
    this.setState({notes: {...oldNotes, [`${num}`]: newNote}})
  }
  addTags(newTags) {
    const { tags: oldTags } = this.state
    console.log(this.props.tags)
    this.setState({tags: [...oldTags, ...newTags]})
  }
  handleClose() {
    const { onSetTag, onSetNote, onClose, view } = this.props
    onSetNote({
      id: view,
      notes: this.state.notes
    })
    onSetTag({
      id: view,
      tags: this.state.tags
    })
    onClose(view)
  }
  render() {
    let { item } = this.props
    return(
      <div>
        <h2>Bookmark View</h2>
        <div>{item.title}</div>
        <div>{item.url}</div>
        <AddTags onClick={this.addTags} />
        <TagsList tags={this.state.tags} />
        <AddNote onClick={this.addNote} />
        <Annotation notes={this.state.notes} />
        <div onClick={this.handleClose}>Back</div>
      </div>
    )
  }
}

const ItemStateToProps = (state, { view }) => ({
  item: itemState(state,view),
  notes: notesState(state,view),
  tags: tagsState(state,view)
})
const ItemDispathToProps = (dispatch) => ({
  onClose: id => dispatch(doToggleBookmark(id)),
  onSetNote: (data) => dispatch(doSetNote(data)),
  onSetTag: (data) => dispatch(doSetTag(data)),
  onSetStorage: (data) => dispatch(doSetStorageInfo(data))
})

const ItemView = connect(ItemStateToProps, ItemDispathToProps)(ItemViewDry)

export default ItemView
