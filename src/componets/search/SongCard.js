import React, { Component } from "react";
import { Button } from "reactstrap";
import "./Searchfield.css";

export class SongCard extends Component {
  render() {
    return (
      <div className="songSearch">
        <div className="singleTrack">
          <div>
            {this.props.track.name} by {this.props.track.artists[0].name}
            {"  "}
            <Button size="sm" color="info" className="add">
              +
            </Button>
          </div>
        </div>
        <hr className="hrLine"/>
      </div>
    );
  }
}

export default SongCard;
