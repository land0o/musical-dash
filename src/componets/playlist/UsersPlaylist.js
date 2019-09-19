import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import CreatedPlaylistCard from "./CreatedPlaylistCard";
import DataManager from "../DataManager";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

const playlistId = localStorage.getItem("playlistId");

class UsersPlaylist extends Component {
  state = {
    playlists: [],
    PlaylistId: localStorage.getItem("playlistId")
  };

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
    spotifyWebApi.changePlaylistDetails(playlistId, {})
  }

  render() {
    return (
      <div>
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
    );
  }
}

export default UsersPlaylist;
