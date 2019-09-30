import React, { Component } from "react";
import { Table } from "reactstrap";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { Button, Form, FormGroup, Input } from "reactstrap";
import "./Playlist.css";
import CreatedPlaylistCard from "./CreatedPlaylistCard";
import PlaylistSongCard from "./PlaylistSongCard";
// import EditPlaylistForm from "./EditPlaylistForm";
import Spotify from "spotify-web-api-js";
import SearchField from "../search/SearchField";
// import SongQueList from "../songQue/SongQueList";
import DataManager from "../DataManager";

const spotifyWebApi = new Spotify();
const userId = sessionStorage.getItem("spotifyId");

class PlaylistHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: sessionStorage.getItem("spotifyId"),
      userName: sessionStorage.getItem("SpotifyName"),
      playlistName: "",
      currentPlaylistId: "",
      playlistId: "",
      playlistDesc: "",
      playlists: [],
      playlistSongs: [],
      title: "",
      description: "",
      editedPlaylist: false
    };
  }
  //renders playlist to created playlist card
  componentDidMount() {
    this.grabPlaylist();
    this.grabSongs();
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
  grabSongs = () => {
    DataManager.getAllSongs(this.state.playlistId).then(songResponse => {
      console.log("Songs in response", songResponse);
      this.setState({
        playlistSongs: songResponse
      });
      console.log("Songs in current playlist", this.state.playlistSongs);
      console.log(this.state);
    });
  };
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
        description: this.state.playlistDesc,
        public: false,
        collaborative: true
      })
      .then(playlistResponse => {
        console.log("newPlaylist response", playlistResponse);
        this.setState({ currentPlaylistId: playlistResponse.id });
        // sessionStorage.setItem("PlaylistId", this.id);
        const playlistObj = {
          spotifyId: this.state.currentPlaylistId,
          title: this.state.playlistName,
          description: this.state.playlistDesc,
          userSpotifyId: this.state.userId,
          userName: this.state.userName
        };
        console.log(playlistObj);
        return playlistObj;
      })
      .then(playlistObj =>
        DataManager.postPlaylist(playlistObj)
          .then(obj => {
            this.setState({ playlistId: obj.id }, console.log("state", obj));
          })
          .then(() => this.grabPlaylist())
          .then(() => {
            alert(`Playlist ${this.state.playlistName} has been created!`);
          })
      );
  }
  //edits the dom spotify and my database.
  editPlaylist = (playlist, playlistId) => {
    console.log(playlist);
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
    DataManager.deletePlaylist(this.state.playlistId)
      .then(spotifyWebApi.unfollowPlaylist(playlistId))
      .then(() => this.grabPlaylist());
    alert("Playlist has been deleted");
  };

  //handles the submission of the playlist
  addPlaylistInfo = evt => {
    evt.preventDefault();
    this.getNewPlaylist();
    console.log(this.state.playlistName);
    console.log(userId);
  };
  //will add playlist to storage or state for mod
  addCurrentPlaylistToStorage = (PlaylistObj, playlistId) => {
    this.setState(
      {
        playlistId: PlaylistObj.id,
        playlistName: PlaylistObj.title,
        currentPlaylistId: playlistId,
        playlistDesc: PlaylistObj.description,
        userSpotifyId: PlaylistObj.userSpotifyId
      },
      this.grabSongs
    );
    console.log(playlistId);
    console.log(PlaylistObj);
    console.log(this.state);
  };
  removeSongs = removeObj => {
    console.log(removeObj);
    console.log(removeObj.song_uri);
    console.log(this.state.currentPlaylistId);
    spotifyWebApi
      .removeTracksFromPlaylist(
        this.state.currentPlaylistId,
        removeObj.song_uri
      )
      .then(DataManager.deleteSong(removeObj.id)
      .then(() => this.grabSongs())
      .then(alert(`Song has been removed from ${this.state.playlistName}`)))
  };
  userFollowPlaylist = id => {
    console.log(id);
    spotifyWebApi
      .followPlaylist(id.playlistId)
      .then(alert(`${id.title} has been added to your playlists`));
  };
  playMusic = id => {
    console.log(id);
    console.log(this.state.currentPlaylistId);
    spotifyWebApi.play({
      context_uri: `spotify:playlists:${this.state.currentPlaylistId}`
    });
    // {"context_uri": "spotify:playlists:1Je1IMUlBXcx1Fz0WE7oPT"}
  };

  render() {
    return (
      <div>
        <div className="playlistContainer">
          <Card className="playlistCard">
            <CardBody className="topCard">
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
              <SearchField
                playlistId={this.state.playlistId}
                grabSongs={this.grabSongs}
                currentPlaylistId={this.state.currentPlaylistId}
                playlistName={this.state.playlistName}
                {...this.props}
              />
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
                  {this.state.playlistSongs.map((playlistSong, i) => (
                    <tr key={i}>
                      <PlaylistSongCard
                        {...this.props}
                        removeSongs={this.removeSongs}
                        playlistSong={playlistSong}
                      />
                    </tr>
                  ))}
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
                        playlistName={this.state.playlistName}
                        addCurrentPlaylistToStorage={
                          this.addCurrentPlaylistToStorage
                        }
                        userFollowPlaylist={this.userFollowPlaylist}
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
        {/* <SongQueList {...this.props} playlistName={this.state.playlistName} /> */}
      </div>
    );
  }
}

export default PlaylistHome;
