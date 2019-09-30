import React, { Component } from "react";
import { Button } from "reactstrap";
import EditPlaylistForm from "./EditPlaylistForm";

class CreatedPlaylistCard extends Component {
  state = {
    showEditForm: false,
    title: ""
  };
  //add music btn needs to set playlistId into state or local storage while also adding playlist info and tracks[] into state to manipulate the dom may need to use componet did mount to render
  handleAddMusic = () => {
    const playlistId = this.props.playlist.spotifyId;
    const PlaylistObj = {
      id: this.props.playlist.id,
      title: this.props.playlist.title,
      description: this.props.playlist.description,
      userSpotifyId: this.props.playlist.userSpotifyId
    };
    this.props.addCurrentPlaylistToStorage(PlaylistObj, playlistId);
  };
  handleAddPlaylist = () => {
    const PlaylistObj = {
      playlistId: this.props.playlist.spotifyId,
      title: this.props.playlist.title
    };
    this.props.userFollowPlaylist(PlaylistObj);
  };

  render() {
    return (
      <div className="createdPlaylistCard">
        <div className="singlePlaylist">
          <p>
            {this.props.playlist.title} for {this.props.playlist.description}
            <br />
            <Button
              size="sm"
              color="info"
              className="editPlaylist"
              onClick={() => this.setState({ showEditForm: true })}
            >
              edit
            </Button>
            <Button
              size="sm"
              color="info"
              className="editPlaylist"
              onClick={this.handleAddMusic}
            >
              <span role="img" />
              Add🎵
            </Button>
            <Button
              size="sm"
              color="info"
              className="editPlaylist"
              onClick={this.handleAddPlaylist}
            >
              Follow
            </Button>
          </p>
          <hr className="hrLine" />
        </div>
        {/* toggles the input field to true so it shows*/}
        {this.state.showEditForm ? (
          <EditPlaylistForm
            playlist={this.props.playlist}
            deletePlaylist={this.props.deletePlaylist}
            editPlaylist={this.props.editPlaylist}
          />
        ) : null}
      </div>
    );
  }
}

export default CreatedPlaylistCard;
