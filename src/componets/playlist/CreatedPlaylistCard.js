import React, { Component } from "react";
import { Button } from "reactstrap";

class CreatedPlaylistCard extends Component {
  render() {
    return (
      <div className="createdPlaylistCard">
        <div className="singlePlaylist">
          <p>
            {this.props.playlist.title} for {this.props.playlist.description}
            <br/>
            <Button
              size="sm"
              color="info"
              className="editPlaylist"
              onClick={() => this.props.editPlaylist(this.props.playlist)}
            >
              edit
            </Button>
            <Button
              size="sm"
              color="info"
              className="editPlaylist"
            >
             <span role="img"/>Add🎵
            </Button>
          </p>
          <hr className="hrLine" />
        </div>
      </div>
    );
  }
}

export default CreatedPlaylistCard;
