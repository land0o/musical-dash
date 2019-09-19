import React, { Component } from "react";
import { Button } from "reactstrap";

class CreatedPlaylistCard extends Component {
  render() {
    return (
      <div className="createdPlaylistCard">
        <div className="singlePlaylist">
          <p>
            {this.props.playlist.title} for {this.props.playlist.description}
            <Button size="sm" color="info" className="editPlaylist">
              edit
            </Button>
          </p>
          <hr className="hrLine" />
        </div>
      </div>
    );
  }
}

export default CreatedPlaylistCard;
