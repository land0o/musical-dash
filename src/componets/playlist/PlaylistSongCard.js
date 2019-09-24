import React, { Component } from "react";
import { Button } from "reactstrap";

class PlaylistSongCard extends Component {
  render() {
    return (
        <React.Fragment>
        <tr>
          <td>Millionaire</td>
          <td>Chris Stapleton</td>
          <td>From A Room Volume 2</td>
          <td>
            <Button size="sm" color="info">
              x
            </Button>
          </td>
        </tr>
        </React.Fragment>
    );
  }
}

export default PlaylistSongCard;
