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
  //works but I have to hit edit 1st and it post the playlistId to the database
  handleEdit = () => {
    const editedPlaylistObj = {
      id: this.props.playlist.id,
      title: this.state.title,
      description: this.state.description
    };
    this.props.editPlaylist(editedPlaylistObj);
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
          <Button
            size="sm"
            color="info"
            className="editPlaylist"
            onClick={this.handleEdit}
          >
            save
          </Button>
          <hr className="hrLine" />
        </div>
      </div>
    );
  }
}

export default EditPlaylistForm;
