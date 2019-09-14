import React, { Component } from "react";
import "./Searchfield.css";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { InputGroup, Button, Input } from "reactstrap";
import Spotify from "spotify-web-api-js";
import SongCard from "./SongCard";

const spotifyWebApi = new Spotify();

class SearchField extends Component {
  state = {
    tracks: [],
    songSearch: ""
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    console.log(stateToChange);
  };

  songSearch = evt => {
    evt.preventDefault();
    this.searchTracks(this.state.songSearch);
    console.log(this.state.songSearch);
  };

  searchTracks = songSearch => {
    spotifyWebApi.searchTracks(songSearch).then(data => {
      this.setState({
        tracks: data.tracks.items,
        songSearch: ""
      });
      console.log(this.state.tracks);
    });
  };
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
            <CardText className="cardText">
              {this.state.tracks.map((track, index) => (
                <SongCard {...this.props} track={track} key={index} />
              ))}
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SearchField;
