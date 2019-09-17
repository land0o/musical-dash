import React, { Component } from "react";
import { Table } from "reactstrap";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Button, ButtonGroup, Form, FormGroup, Input } from "reactstrap";
import "./Playlist.css";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();
const userId = localStorage.getItem("spotifyId");

//1. what functions are needed to create playlist? need userid(is in local storage), name and desc req
//2.finish up functionality to get functioning playlist
//3. refer to the create playlist documention
//4. will need a button to save playlist to database and to users spotify
//5. a end playlist btn?

class PlaylistHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cSelected: [],
      userId: localStorage.getItem("spotifyId"),
      playlistName: "",
      playlistDesc: "",
      currentPlaylistId: localStorage.getItem("playlistId"),
      newPlaylist: []
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }
  handleSubmit = evt => {
    evt.preventDefault();
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    console.log(stateToChange);
  };

  getNewPlaylist() {
    spotifyWebApi
      .createPlaylist(userId, {
        name: this.state.playlistName,
        description: this.state.playlistDesc
      })
      .then(playlistResponse => {
        console.log("newPlaylist response", playlistResponse);
        localStorage.setItem("currentPlaylistId", playlistResponse.id);
      });
    alert(`Playlist ${this.state.playlistName} has been created!`);
  }
  // will need to make a section that holds a users playlist, and then allow them to update pre-made playlist that were made with this app
  //need to add the login to the landing page remove it from the dashboard
  //need to import the nav and sidebar
  //on the navbar the logo to the left and logout(clear localstoarge and reroute to homepage)
  //need to put the cards into the correct layout
  //will need to create a section that shows user's playlist and allow them to be crud'd
  // list of user playlist with songs
  //edit playlist
  //login then show dash

  addPlaylistInfo = evt => {
    evt.preventDefault();
    this.getNewPlaylist();
    console.log(this.state.PlaylistName);
    console.log(userId);
  };

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  render() {
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
                    id="playlistName"
                    onChange={this.handleSubmit}
                    placeholder="Playlist Name"
                    value={this.state.playlistName}
                  />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Input
                    className="playlistInput"
                    id="playlistDesc"
                    onChange={this.handleSubmit}
                    placeholder="Short Description"
                    value={this.state.playlistDesc}
                  />
                </FormGroup>
                <Button
                  className="playlistBtn"
                  onClick={this.addPlaylistInfo}
                  outline
                  color="info"
                >
                  Add
                </Button>
              </Form>
            </CardSubtitle>
            <CardSubtitle>
              Playlist Name: {this.state.playlistName}
            </CardSubtitle>
            <CardSubtitle>{this.state.playlistDesc}</CardSubtitle>
          </CardBody>
          <CardText>
            <ButtonGroup>
              <Button
                outline
                color="info"
                s
                onClick={() => this.onRadioBtnClick(1)}
                active={this.state.rSelected === 1}
              >
                back
              </Button>
              <Button
                outline
                color="info"
                onClick={() => this.onRadioBtnClick(2)}
                active={this.state.rSelected === 2}
              >
                play/pause
              </Button>
              <Button
                outline
                color="info"
                onClick={() => this.onRadioBtnClick(3)}
                active={this.state.rSelected === 3}
              >
                skip
              </Button>
            </ButtonGroup>
            <p>Selected: {this.state.rSelected}</p>
          </CardText>
          <CardBody className="playlistTable">
            <Table dark className="playlistSelector">
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
