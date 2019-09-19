import React, { Component } from "react";
import { Table } from "reactstrap";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { Button, ButtonGroup, Form, FormGroup, Input } from "reactstrap";
import "./Playlist.css";
import CreatedPlaylistCard from "./CreatedPlaylistCard";
import Spotify from "spotify-web-api-js";
import DataManager from "../DataManager";

const spotifyWebApi = new Spotify();
const userId = localStorage.getItem("spotifyId");
const playlistId = localStorage.getItem("playlistId");

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
      playlists: [],
      PlaylistId: localStorage.getItem("playlistId"),
      newPlaylist: []
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }
  componentDidMount() {
    this.grabPlaylist();
  }
  grabPlaylist = () => {
    DataManager.getAllPlaylists().then(playlistResponse => {
      console.log(playlistResponse);
      this.setState({
        playlists: playlistResponse
      });
    });
  };
  editPlaylistInfo = () => {
    spotifyWebApi.changePlaylistDetails(playlistId, {});
  };

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
        const playlistObj = {
          spotifyId: playlistResponse.id,
          title: this.state.playlistName,
          description: this.state.playlistDesc
        };
        console.log(playlistObj);
        return playlistObj;
      })
      .then(playlistObj => {
        DataManager.postPlaylist(playlistObj);
      });
    alert(`Playlist ${this.state.playlistName} has been created!`);
  }
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
          <div>
            <ButtonGroup>
              <Button
                outline
                color="info"
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
          </div>
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
        <div className="UserPlaylists">
          <Card>
            <CardHeader>Playlist Created By MusicalDash</CardHeader>
            <CardBody>
              <CardTitle>User created playlist</CardTitle>
              <div>
                {this.state.playlists.map((playlist, i) => (
                  <CreatedPlaylistCard playlist={playlist} key={i} />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default PlaylistHome;
