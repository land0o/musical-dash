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
      test: "",
      userName: "",
      spotifyId: "",
      userImage: "",
      nowPlaying: {
        name: "Not Checked",
        image: ""
      }
    };
    //if user is logged in with spotify returns tokens and post new users to database
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
      this.getloggedInUser();
    }
  }
  //from spotify grabs tokens that makes app functional
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
  //shows what is currently playing on users device
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
  //grabs needed info from spotify for the current user and post to database
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
        this.setState({spotifyId: response.id})
        sessionStorage.setItem("spotifyId", response.id);
        sessionStorage.setItem("SpotifyEmail", response.email);
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
          <a href="http://localhost:8888">
            <button>
              Refresh Tokens
            </button>
          </a>
          <a href="http://localhost:3000">
            <button>
              Logout
            </button>
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
      
          <PlaylistHome spotifyId={this.state.spotifyId}  {...this.props} />
        </div>
        {/* <div>
          <SearchField {...this.props} />
        </div> */}
      </div>
    );
  }
}

export default CurrentTrack;
