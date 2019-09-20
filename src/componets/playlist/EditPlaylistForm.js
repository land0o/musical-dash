import React, { Component } from "react";
import { Button } from "reactstrap";
class EditPlaylistForm extends Component {
  state = {
    title: "",
    description: ""
  };

  componentDidMount() {
    this.setState({
      title: this.props.playlist.title,
      description: this.props.playlist.description
    });
  }
  handleInput = evt => {
    console.log(evt.target.value);
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    console.log(stateToChange);
  };
  handleEdit = () => {
    const playlistId = this.props.playlist.spotifyId;
    const editedPlaylistObj = {
      id: this.props.playlist.id,
      title: this.state.title,
      description: this.state.description
    };
    this.props.editPlaylist(editedPlaylistObj, playlistId);
  };
  handleDelete = () => {
    const playlistId = this.props.playlist.spotifyId;
    this.props.deletePlaylist(this.props.playlist.id, playlistId);
  };

  render() {
    return (
      <div className="createdPlaylistCard">
        <div className="singlePlaylist">
          <input
            id="title"
            type="text"
            onChange={this.handleInput}
            value={this.state.title}
          />
          <input
            id="description"
            type="text"
            value={this.state.description}
            onChange={this.handleInput}
          />
          <br />
          <Button
            size="sm"
            color="info"
            className="editPlaylist"
            onClick={this.handleEdit}
          >
            save
          </Button>
          <Button
            size="sm"
            color="info"
            className="editPlaylist"
            onClick={this.handleDelete}
          >
            Delete
          </Button>
          <hr className="hrLine" />
        </div>
      </div>
    );
  }
}

export default EditPlaylistForm;
