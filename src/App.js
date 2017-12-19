import React, { Component } from 'react';
import RoomList from './components/RoomList'
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
  render() {
    return (
      <RoomList firebase={firebase}/>
    );
  }
}

export default App;
