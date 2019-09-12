import React, { Component } from "react";

export class SongCard extends Component {
  render() {
    return (
      <div className="songSearch" key={this.props.index}>
        <div className="singleTrack" >
          <p>
            {this.props.track.name} by{" "}
            {this.props.track.artists[0].name}
          </p>
          <button className="add">add</button>
        </div>
      </div>
    );
  }
}

export default SongCard;
