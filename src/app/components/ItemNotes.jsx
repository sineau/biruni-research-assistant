import React from 'react'

import { ItemButton } from '../styles/bookmarks-styled'

class AddNote extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {value: ""}
  }
  handleChange(e) {
    this.setState({value: e.target.value})
  }
  handleSubmit() {
    const note = this.state.value
    this.props.onClick(note)
    this.setState({value: ""})
  }
  render() {
    return(
      <form>
        <textarea value={this.state.value} onChange={this.handleChange}></textarea>
        <ItemButton onClick={this.handleSubmit}>Add Note</ItemButton>
      </form>

    )
  }
}

export default AddNote
