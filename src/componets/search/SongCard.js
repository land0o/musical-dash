import React, { Component } from "react";
import { Button } from "reactstrap";
import "./Searchfield.css";

export class SongCard extends Component {
  // handleInput = evt => {
  //   console.log(evt.target.value);
  //   const stateToChange = {};
  //   stateToChange[evt.target.id] = evt.target.value;
  //   this.setState(stateToChange);
  //   console.log(stateToChange);
  // };

  addSongToPlaylist = event => {
    const playlistId = localStorage.getItem("currentPlaylistId")
    const playlistName = localStorage.getItem("currentPlaylistName")
    const songInfo = {
      songName: this.props.track.name,
      albumName: this.props.track.album.name,
      artistName: this.props.track.artists[0].name,
      song_uri: [this.props.track.uri],
      song_id: this.props.track.id,
      playlistId: playlistId,
      playlistName: playlistName
    };
    this.props.addSongToSpotify(songInfo);
  };

  render() {
    return (
      <div className="songSearch">
        <div className="singleTrack">
          <div>
            {this.props.track.name} by {this.props.track.artists[0].name}
            {"  "}
            <Button
              size="sm"
              color="info"
              className="add"
              onClick={this.addSongToPlaylist}
            >
              +
            </Button>
          </div>
        </div>
        <hr className="hrLine" />
      </div>
    );
  }
}

export default SongCard;
