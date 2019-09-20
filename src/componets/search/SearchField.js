import React, { Component } from "react";
import "./Searchfield.css";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { InputGroup, Button, Input } from "reactstrap";
import Spotify from "spotify-web-api-js";
import SongCard from "./SongCard";

const spotifyWebApi = new Spotify();
// const playlistId = localStorage.getItem("playlistId");

class SearchField extends Component {
  state = {
    tracks: [],
    PlaylistId: localStorage.getItem("playlistId"),
    songSearch: ""
  };
  //grabs the info from the search input field
  handleSubmit = evt => {
    evt.preventDefault();
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    console.log(stateToChange);
  };
  //submits info and returns results
  songSearch = evt => {
    evt.preventDefault();
    this.searchTracks(this.state.songSearch);
    console.log(this.state.songSearch);
  };
  //gets song info from spotify
  searchTracks = songSearch => {
    spotifyWebApi.searchTracks(songSearch).then(data => {
      this.setState({
        tracks: data.tracks.items,
        songSearch: ""
      });
      console.log(this.state.tracks);
    });
  };

  //to add songs you need playlistId, songuri and song id, pass the info in like we did with the getNewPlaylist Function
  addSongToSpotify = track => {
    console.log(track);
    const playlistId = localStorage.getItem("currentPlaylistId");
    spotifyWebApi
      .addTracksToPlaylist(playlistId, {id:track.id})
      .then(data => {
        console.log("Data returned from songs from spotify", data);
      });
  };

  addSongToPlaylist = track => {
    const songInfo = {
      songName: track.name,
      albumName: track.album.name,
      artistName: track.artists[0].name,
      song_uri: track.id,
      song_id: track.uri
    };
  };
  //use map to iterate over the search results to elect one song and get the info needed(id,songURi, name and artist)
  //1. allow search for tracks to be added to playlist
  //2. send a confirmation alert to add song
  //2. collect song id and song uri add to queued array for playlist and database with a post fetch
  //3. display songs that were added to playlist to the table and display track, artist, album

  render() {
    return (
      <div className="searchCard">
        <Card className="songCard">
          <CardTitle className="searchHeader">Search Music</CardTitle>
          <InputGroup>
            <Input
              className="searchInput"
              id="songSearch"
              onChange={this.handleSubmit}
              placeholder="Search for Music"
              value={this.state.songSearch}
            />
            <Button size="sm" onClick={this.songSearch}>
              Search
            </Button>
          </InputGroup>
          <CardBody>
            <CardSubtitle className="searchHeader">Search Results</CardSubtitle>
            <div className="cardText">
              {this.state.tracks.map((track, index) => (
                <SongCard
                  {...this.props}
                  track={track}
                  key={index}
                  addSongToSpotify={this.addSongToSpotify}
                />
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SearchField;
