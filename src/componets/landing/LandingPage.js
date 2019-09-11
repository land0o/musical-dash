import React, { Component } from "react";
import { Button } from "reactstrap";
import "./Landing.css";

class LandingPage extends Component {
  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <React.Fragment>
        <article className="intro">
          <div className="inner">
            <h1>Welcome To MusicalDash!!</h1>
            <h4>A social app for Spotify Playlist.</h4>
          </div>
        </article>
        <article className="landingBtns">
          <section className="buttons">
            <Button
              color="success"
              onClick={() => this.nextPath("./trackInfo")}
            >
              Build A Playlist
            </Button>
            {"  "}
            <Button color="warning">Join A Playlist</Button>
          </section>
        </article>
      </React.Fragment>
    );
  }
}

export default LandingPage;
