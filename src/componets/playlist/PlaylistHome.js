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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
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
