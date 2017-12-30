import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import './App.css';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAArVcaZf_1Dqz67-BWqsgBY8eOLt0W1dk",
  authDomain: "bloc-chat-react-91462.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-91462.firebaseio.com",
  projectId: "bloc-chat-react-91462",
  storageBucket: "bloc-chat-react-91462.appspot.com",
  messagingSenderId: "988697941971"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: 'No Room Selected Yet',
      activeUser: 'Guest'
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room })
  }

  setUser(user) {
    this.setState( { activeUser : user.displayName})
  }

  render() {
    return (
      <div>
        <User firebase={firebase} setUser={(user) => this.setUser(user)}/>

        <RoomList firebase={firebase} activeRoom={this.state.activeRoom}
        setActiveRoom={this.setActiveRoom}/>

        <h1> Active Room: { this.state.activeRoom.name} </h1>

        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} activeUser={this.state.activeUser}/>

      </div>
    );
  }
}

export default App;
