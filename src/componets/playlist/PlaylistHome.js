import React, { Component } from "react";
import { Table } from "reactstrap";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Button, Form, FormGroup, Input } from "reactstrap";
import "./Playlist.css";

class PlaylistHome extends Component {
  render() {
    //1. what functions are needed to create playlist?
    //2.finish up functionality to get functioning playlist
    //3. refer to the create playlist documention
    //4. will need a button to save playlist to database and to users spotify
    //5. a end playlist btn?
    return (
      <div className="playlistContainer">
        <Card className="playlistCard">
          <CardBody>
            <CardTitle>Create A PlayList</CardTitle>
            <hr />
            <CardSubtitle className="playlistForm">
              <Form inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Input
                    className="playlistInput"
                    placeholder="Playlist Name"
                  />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Input
                    className="playlistInput"
                    placeholder="Short Description"
                  />
                </FormGroup>
                <Button className="playlistBtn" outline color="info">
                  Add
                </Button>
              </Form>
            </CardSubtitle>
            <CardSubtitle>Playlist Name: Code Juice</CardSubtitle>
            <CardSubtitle>Playlist Description: Code N Jam</CardSubtitle>
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
