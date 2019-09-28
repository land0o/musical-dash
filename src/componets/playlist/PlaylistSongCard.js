import React, { Component } from "react";
import { Button } from "reactstrap";

class PlaylistSongCard extends Component {
  handleRemoveSong = () => {
    const removeObj = {
      song_uri: this.props.playlistSong.song_uri,
      id: this.props.playlistSong.id
    };
    this.props.removeSongs(removeObj);
  };

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
