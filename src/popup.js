import React from 'react';
import ReactDOM from 'react-dom';

class Popup extends React.Component {
  constructor() {
    super()
    this.openApp = this.openApp.bind(this)
  }
  openApp() {
    browser.tabs.create({url: "/app.html"})
  }
  render() {
    return (
      <div>
        <h3>Research Assistant</h3>
        <button onClick={this.openApp}>Open App</button>
      </div>
    )}
}

ReactDOM.render(
  <Popup />,
  document.getElementById('root')
)
