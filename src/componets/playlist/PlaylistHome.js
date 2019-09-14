import React, { Component } from "react";
import { Table } from "reactstrap";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { InputGroup, Button, Input } from "reactstrap";
import "./Playlist.css";

class PlaylistHome extends Component {
  render() {
    return (
      <div className="playlistContainer">
        <Card className="playlistCard">
          <CardBody>
            <CardTitle>PlayList</CardTitle>
            <hr />
            <CardSubtitle>
              <InputGroup>
                <Input className="searchInput" placeholder="Playlist Name" />
                <Button size="sm">Add</Button>
              </InputGroup>
            </CardSubtitle>
            <CardSubtitle>Playlist Name: The Juice</CardSubtitle>
          </CardBody>
          <CardText>Will Add the play and pause here</CardText>
          <CardBody className="playlistTable">
            <Table dark>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Album</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Millionaire</td>
                  <td>Chris Stapleton</td>
                  <td>From A Room Volume 2</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Scenes from an Italian Restaurant</td>
                  <td>Billy Joel</td>
                  <td>The Stranger</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Exactly</td>
                  <td>EarthGang</td>
                  <td>Shalow Graves For Toys</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default PlaylistHome;
