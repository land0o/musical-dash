import React, { Component } from "react";
import "./CurrentTrack.css";
import Spotify from "spotify-web-api-js";
import SearchField from "../search/SearchField";
import PlaylistHome from "../playlist/PlaylistHome";
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

  //NEED TO COLLECT USER INFO AND SAVE TO DATABASE ONE TIME SHOULD BE A CONDITIONAL
  getloggedInUser() {
    spotifyWebApi.getMe().then(response => {
      const newUser = {
        email: response.email,
        userName: response.display_name,
        spotifyId: response.id,
        userImage: response.images[0].url
      };
      console.log("spotify response", response);
      console.log(newUser);
      localStorage.setItem("spotifyId", response.id);
      localStorage.setItem("SpotifyEmail", response.email);
    })
  }
  //why is it not working?
  // .then(
  //   if (this.response.newUser.find(users => users.userName === this.response.userName)) {
  //    return console.log("user already in database");
  //  } else {
  //    DataManager.postUser(this.newUser)
  //  })

  render() {
    this.getloggedInUser();
    return (
      <div className="App">
        <div className="links">
          <h3>Welcome To MusicalDash</h3>
          <a href="http://localhost:8888">
            <button className="login">Login with Spotify</button>
          </a>
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
          <button className="checkSongBtn" onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        </div>
        <div>
          <PlaylistHome {...this.props} />
        </div>
        <div>
          <SearchField {...this.props} />
        </div>
      </div>
    );
  }
}

export default CurrentTrack;
