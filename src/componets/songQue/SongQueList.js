import React, { Component } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import { Table } from "reactstrap";
import SongQueCard from "./SongQueCard";
import "./SongQue.css";

export class SongQueList extends Component {
  render() {
    return (
      <div>
        <Card className="cardBody" body inverse>
          <CardTitle>Qued Songs to be Added to {this.props.playlistName}</CardTitle>
          <CardBody>
            <Table dark className="playlistSelector">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Album</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <SongQueCard />
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SongQueList;
