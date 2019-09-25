import React, { Component } from "react";
import { Button } from "reactstrap";

class PlaylistSongCard extends Component {

  handleRemoveSong = () => {
    // const playlistId = this.props.playlist.spotifyId;

    this.props.removeSong();
  }

  render() {
    return (
        <React.Fragment>
          <td>{this.props.playlistSong.songName}</td>
          <td>{this.props.playlistSong.artistName}</td>
          <td>{this.props.playlistSong.albumName}</td>
          <td>
            <Button size="sm" color="info" onClick={this.handleRemoveSong}>
              x
            </Button>
          </td>
        </React.Fragment>
    );
  }
}

export default PlaylistSongCard;
