import React, { Component } from "react";
import { Button } from "reactstrap";
import "./Searchfield.css";

export class SongCard extends Component {
  render() {
    return (
      <div className="songSearch" key={this.props.index}>
        <div className="singleTrack">
          <p>
            {this.props.track.name} by {this.props.track.artists[0].name}
            {"  "}
            <Button size="sm" color="info" className="add">
              +
            </Button>
          </p>
        </div>
      </div>
    );
  }
}

export default SongCard;
