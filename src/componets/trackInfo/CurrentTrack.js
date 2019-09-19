import React, { Component } from "react";
import "./CurrentTrack.css";
import Spotify from "spotify-web-api-js";
import SearchField from "../search/SearchField";
import PlaylistHome from "../playlist/PlaylistHome";
import UsersPlaylist from "../playlist/UsersPlaylist";
import DataManager from "../DataManager";

const spotifyWebApi = new Spotify();

class CurrentTrack extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      users: [],
      email: "",
      test: "",
      userName: "",
      spotifyId: "",
      userImage: "",
      nowPlaying: {
        name: "Not Checked",
        image: ""
      }
    };
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
      this.getloggedInUser();
    }
  }
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState().then(response => {
      console.log(response);
      this.setState({
        nowPlaying: {
          name: response.item.name,
          image: response.item.album.images[0].url
        }
      });
    });
  }
  componentDidMount() {
    // getAll users from database
    DataManager.getAllUsers().then(users => {
      this.setState({
        users: users
      });
    });
  }
  getloggedInUser() {
    spotifyWebApi
      .getMe()
      .then(response => {
        const newUser = {
          email: response.email,
          userName: response.display_name,
          spotifyId: response.id,
          userImage: response.images[0].url
        };
        // console.log("spotify response", response);
        // console.log(newUser);
        localStorage.setItem("spotifyId", response.id);
        localStorage.setItem("SpotifyEmail", response.email);
        this.setState({ newUser: newUser });
        return response;
      })
      .then(response => {
        // console.log(response);
        DataManager.checkUsers(response.email, response.id).then(
          checkedUsers => {
            if (checkedUsers.length > 0) {
              this.setState({ test: "hello" });
            } else {
              DataManager.postUser(this.state.newUser);
              this.setState({ test: "hello2" });
            }
          }
        );
      });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="links">
          <h3>Welcome To MusicalDash</h3>
        </div>
        <div className="currentSong">
          <div>
            {" "}
            <h3>Now Playing: {this.state.nowPlaying.name} </h3>{" "}
          </div>
          <div>
            <img
              className="songImg"
              src={this.state.nowPlaying.image}
              alt="Now Playing"
            />
          </div>
          <button
            className="checkSongBtn"
            onClick={() => this.getNowPlaying()}
          >
            Check Now Playing
          </button>
        </div>
        <div>
          <PlaylistHome {...this.props} />
        </div>
        <div>
          <SearchField {...this.props} />
        </div>
        <div>
          <UsersPlaylist {...this.props} />
        </div>
      </div>
    );
  }
}

export default CurrentTrack;
