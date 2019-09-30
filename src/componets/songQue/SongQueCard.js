import React, { Component } from "react";
import { Button } from "reactstrap";

class SongQueCard extends Component {
  render() {
    return (
      <React.Fragment>
        <td>Millionaire</td>
        <td>Chris Stapleton</td>
        <td>From A Room Volume 2</td>
        {/* <td>{this.props.playlistSong.songName}</td>
        <td>{this.props.playlistSong.artistName}</td>
        <td>{this.props.playlistSong.albumName}</td> */}
        <td>
          <Button size="sm" color="info">
            ✔
          </Button>
        </td>
        <td>
          <Button size="sm" color="info">
            X
          </Button>
        </td>
      </React.Fragment>
    );
  }
}

export default SongQueCard;
