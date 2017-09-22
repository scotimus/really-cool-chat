import React, { Component, PropTypes } from 'react';
 
// message component - represents a single todo item
export default class Message extends Component {
  render() {
    return (
      <li>{this.props.message.text}</li>
    );
  }
}
 
Message.propTypes = {
  // This component gets the message to display through a React prop.
  // We can use propTypes to indicate it is required
  message: PropTypes.object.isRequired,
};