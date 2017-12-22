import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
      activeRoom: 'No Room Selected Yet'
    };
  }

  setActiveRoom(e) {
    this.setState({ activeRoom: e.target.value })
  }

  render() {
    return (
      <div>
        <RoomList
        firebase={firebase}
        activeRoom={this.state.activeRoom}
        setActiveRoom={(e) => this.setActiveRoom(e)}/>
        <h1> Active Room: { this.state.activeRoom} </h1>
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom}/>
      </div>
    );
  }
}

export default App;
