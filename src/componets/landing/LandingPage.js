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
          <a href="http://localhost:8888">
            <Button
              outline color="warning"
              // onClick={() => this.nextPath("./trackInfo")}
            >
              Login with Spotify
            </Button>
            </a>
          </section>
        </article>
      </React.Fragment>
    );
  }
}

export default LandingPage;
