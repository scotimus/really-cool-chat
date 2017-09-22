import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Messages } from '../api/messages.js';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';
 
// App component - represents the whole app
class App extends Component {

    handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Messages.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderMessages() {
    return this.props.messages.map((message) => (
      <Message key={message._id} message={message} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Really cool chat</h1>

          <form className="new-message" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="send message"
            />
          </form>

        </header>
 
        <ul>
          {this.renderMessages()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  messages: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    messages: Messages.find({}, { sort: { createdAt: -1 } , limit: 30 }).fetch(),
  };
}, App);