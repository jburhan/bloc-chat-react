import React, { Component } from 'react';


class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessageContent: ''
    };

  this.roomsRef = this.props.firebase.database().ref('messages');
 }

 createMessage(e) {
   e.preventDefault();
   if (!this.state.newMessageContent) { return }
   this.roomsRef.push({
     content: this.state.newMessageContent,
     roomId: this.props.activeRoom.key,
     username: this.props.activeUser,
     sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
   });
   this.setState({ newMessageContent: '' });
 }

 deleteMessage(e){
   e.preventDefault();
  this.roomsRef.child(e.target.value).remove();
 }

  handleChange(e){
    this.setState({ newMessageContent: e.target.value })
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages : this.state.messages.concat ( message ) })
    });
    this.roomsRef.on('child_removed', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.filter( function(value) {
        return value.key !== message.key;
      }) })
    });
  }

  render() {
    return (
      <div className="message-list">
        <h3 id="messages"> Messages: </h3>
        <ul id="messages-content">
          {this.props.activeRoom && this.state.messages.filter(message =>
            message.roomId === this.props.activeRoom.key)
          .map((message,key) => (
          <li className="message" key={message.key}>
            {message.username}: {message.content} <br /> {message.sentAt}
            <button id="delete-message" value={message.key} onClick={ (e) => this.deleteMessage(e)}>Delete</button>
          </li>
          ))}
        </ul>
        { this.props.activeRoom && this.props.activeUser &&
        <form id="create-message" onSubmit={ (e) => this.createMessage(e)}>
          <input id="text-box" type="text" value={ this.state.newMessageContent } onChange={ (e) => this.handleChange(e)}/>
          <input id="send-button" type="submit" value="Send"/>
        </form>
       }
      </div>
    )
  }
}

export default MessageList;
