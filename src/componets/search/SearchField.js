import React, { Component } from "react";
import "./Searchfield.css";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import Spotify from "spotify-web-api-js";
import SongCard from "./SongCard";

const spotifyWebApi = new Spotify();

class SearchField extends Component {
  state = {
    tracks: [],
    activeItem: "Songs",
    songSearch: ""
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    console.log(stateToChange);
    this.setState({ activeItem: "" });
    console.log(this.state.activeItem);
  };

  // handleSearchEvent = evt => {
  //   evt.preventDefault();
  // };

  // searchInput = evt => {
  //   this.setState({
  //     songSearch: evt.target.value
  //   });
  // };

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
            <Button onClick={this.songSearch}>Search</Button>
          </InputGroup>
          <CardBody>
            <CardSubtitle className="searchHeader">Search Results</CardSubtitle>
            <CardText>
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
