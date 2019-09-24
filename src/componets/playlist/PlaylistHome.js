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
import PlaylistSongCard from "./PlaylistSongCard";
// import EditPlaylistForm from "./EditPlaylistForm";
import Spotify from "spotify-web-api-js";
import DataManager from "../DataManager";

const spotifyWebApi = new Spotify();
const userId = localStorage.getItem("spotifyId");
// const playlistId = localStorage.getItem("playlistId");

//4. will need a button to save playlist to database and to users spotify
//5. a end playlist btn?
//6.need to import the nav and sidebar
//7.on the navbar the logo to the left and logout(clear localstoarge and reroute to homepage)
//8.need to put the cards into the correct layout

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
      title: "",
      description: "",
      editedPlaylist: false
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }
  //renders playlist to created playlist card
  componentDidMount() {
    this.grabPlaylist();
  }
  //function that grabs playlist from database
  grabPlaylist = () => {
    DataManager.getAllPlaylists().then(playlistResponse => {
      console.log(playlistResponse);
      this.setState({
        playlists: playlistResponse
      });
      console.log(this.state.playlists);
    });
  };
  //grabs info from input fields
  handleSubmit = evt => {
    evt.preventDefault();
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    console.log(stateToChange);
  };
  //creates new playlist and post them to database and spotify
  getNewPlaylist() {
    spotifyWebApi
      .createPlaylist(userId, {
        name: this.state.playlistName,
        description: this.state.playlistDesc
      })
      .then(playlistResponse => {
        console.log("newPlaylist response", playlistResponse);
        localStorage.setItem("currentPlaylistId", playlistResponse.id);
        localStorage.setItem("currentPlaylistName", this.state.playlistName);
        const playlistObj = {
          spotifyId: playlistResponse.id,
          title: this.state.playlistName,
          description: this.state.playlistDesc
        };
        console.log(playlistObj);
        return playlistObj;
      })
      .then(playlistObj =>
        DataManager.postPlaylist(playlistObj)
          .then(() => this.grabPlaylist())
          .then(() => {
            alert(`Playlist ${this.state.playlistName} has been created!`);
          })
      );
  }
  //edits the dom spotify and my database.
  editPlaylist = (playlist, playlistId) => {
    console.log(playlist);
    // localStorage.setItem("editPlaylistId", playlist.spotifyId);
    // const playlistId = localStorage.getItem("editPlaylistId");
    console.log(playlistId);
    DataManager.editPlaylist(playlist, playlist.id)
      .then(() => this.grabPlaylist())
      .then(
        spotifyWebApi.changePlaylistDetails(playlistId, {
          name: playlist.title,
          description: playlist.description
        })
      );
  };

  deletePlaylist = (id, playlistId) => {
    DataManager.deletePlaylist(id)
      .then(spotifyWebApi.unfollowPlaylist(playlistId))
      .then(() => this.grabPlaylist());
    alert("Playlist has been deleted");
  };

  //handles the submission of the playlist
  addPlaylistInfo = evt => {
    evt.preventDefault();
    this.getNewPlaylist();
    console.log(this.state.PlaylistName);
    console.log(userId);
  };
  //will add playlist to storage or state for mod
  addCurrentPlaylistToStorage = (PlaylistObj, playlistId) => {
    localStorage.setItem("currentPlaylistId", playlistId);
    localStorage.setItem("currentPlaylistName", PlaylistObj.title);
    localStorage.setItem("PlaylistId", PlaylistObj.id);
    const currentPlaylistName1 = localStorage.getItem("currentPlaylistName");
    const playlistIdNum = localStorage.getItem("PlaylistId");
    console.log(playlistId);
    console.log(playlistIdNum);
    console.log(currentPlaylistName1);
  };

  //not using yet but will be for toggling play functions
  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  render() {
    // this.editPlaylistInfo()
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
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Album</th>
                </tr>
              </thead>
              <tbody>
                <PlaylistSongCard/>
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <div className="UserPlaylists">
          <Card>
            <CardHeader>Playlist Created By MusicalDash</CardHeader>
            <CardBody className="playlistCards">
              <CardTitle>User created playlist</CardTitle>
              <div>
                {this.state.playlists.map((playlist, i) => (
                  <div key={i}>
                    <CreatedPlaylistCard
                      editPlaylist={this.editPlaylist}
                      deletePlaylist={this.deletePlaylist}
                      playlist={playlist}
                      addCurrentPlaylistToStorage={
                        this.addCurrentPlaylistToStorage
                      }
                    />
                    {/* <EditPlaylistForm
                      editPlaylist={this.editPlaylist}
                      playlist={playlist}
                    /> */}
                  </div>
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
