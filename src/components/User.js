import React, { Component } from "react";

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged ( user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut() {
    this.props.firebase.auth().signOut();
    this.props.setUser({displayName: null });
  }

  render() {
    return (
      <header>
        <nav>
          <button className="user-button" id="sign-in" onClick={ () => this.signOut() }> Sign Out </button>
          <button className="user-button" id="sign-out" onClick={ () => this.signIn() }> Sign In </button>
          <h1 id="title"> Bloc Chat Room</h1>
        </nav>
        <p id="current-user" > Current User: {this.props.activeUser}</p>
      </header>
    );
  }
}

export default User;
