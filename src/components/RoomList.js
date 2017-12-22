import React, { Component } from 'react';


class RoomList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.selectRoom = this.selectRoom.bind(this);
  }

  createRoom(e) {
    e.preventDefault();
    if (!this.state.newRoomName) { return }
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({ newRoomName: '' });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value})
  }

  componentDidMount(){
    this.roomsRef.on('child_added',snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat( room )});
    });


  }

  selectRoom(room){
    this.props.setActiveRoom(room);
  }


  render() {
    return(
      <div>
        <form onSubmit={ (e) => this.createRoom (e)}>
          <input type="text" value={ this.state.newRoomName } onChange={ (e) =>
          this.handleChange(e)} />
          <input type="submit" value="Create Room"/>
        </form>
        <ul>
          {this.state.rooms.map( (room, key) => (
            <li key={room.key}>
              <button value={room.name} onClick={ (e) => this.selectRoom(room)}>{room.name}</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RoomList;
