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
     roomId: this.props.activeRoom,
     username: this.props.activeUser,
     sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
   });
   this.setState({ newMessageContent: '' });
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
  }

  render() {
    return (
      <div>
        <h2> Messages: </h2>
        <ul>
          {this.state.messages.filter(message => message.roomId == this.props.activeRoom.key)
          .map((message,key) => (
          <li key={message.key}>
            {message.username}: {message.content} <br /> {message.sentAt}
          </li>
          ))}
        </ul>
        <form onSubmit={ (e) => this.createMessage(e)}>
          <input type="text" value={ this.state.newMessageContent }
          onChange={ (e) => this.handleChange(e)}/>
          <input type="submit" value="Send"/>
        </form>
      </div>
    )
  }
}

export default MessageList;
