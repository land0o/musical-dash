import React, { Component } from "react";

class PlaylistCard extends Component {
    //1. use fetch calls to get data and place in correct place
  render() {
    return (
      <div>
        <tr>
          <th scope="row">1</th>
          <td>Millionaire</td>
          <td>Chris Stapleton</td>
          <td>From A Room Volume 2</td>
        </tr>
      </div>
    );
  }
}

export default PlaylistCard;
