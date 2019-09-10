import React, { Component } from "react";
import "./MusicalDash.css";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class MusicalDash extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
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
  render() {
    return (
      <div className="App">
        <div className="links">
          <h3>Welcome To MusicalDash</h3>
          <a href="http://localhost:8888">
            <button className="login">Login with Spotify</button>
          </a>
          <input id="musicSearch" placeholder="add your favorite songs" />
        </div>
        <div className="currentSong">
          <div> <h3>Now Playing: {this.state.nowPlaying.name} </h3> </div>
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
      </div>
    );
  }
}

export default MusicalDash;
