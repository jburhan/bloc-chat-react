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

  deleteRoom(e) {
    e.preventDefault();
    this.roomsRef.child(e.target.value).remove();
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

    this.roomsRef.on('child_removed', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.filter( function(value) {
        return value.key !== room.key;
      }) })
    });
  }

  selectRoom(room){
    this.props.setActiveRoom(room);
  }


  render() {
    return(
      <div id="room-list">
        <form id="create-room" onSubmit={ (e) => this.createRoom (e)}>
         <input type="text" value={ this.state.newRoomName } onChange={ (e) =>
          this.handleChange(e)} placeholder="Create Room" />
        </form>
        <ul id="rooms">
          {this.state.rooms.map( (room, key) => (
            <li className="room" key={room.key}>
              <button id="room-name" value={room.name} onClick={ (e) => this.selectRoom(room)}>{room.name}</button>
              <button id="delete-room"value={room.key} onClick={ (e) => this.deleteRoom(e)}> Delete </button> 
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RoomList;
