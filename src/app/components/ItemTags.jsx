import React from 'react'

import { ItemButton } from '../styles/bookmarks-styled'

class AddTags extends React.Component {
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
    const { value } = this.state
    const tags = value.split(',')

    this.props.onClick(tags)
    this.setState({value: ""})
  }
  render() {
    return(
      <form>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <ItemButton onClick={this.handleSubmit}>Add Tags</ItemButton>
      </form>

    )
  }
}

export default AddTags
