import React, { Component } from "react";
import LandingPage from "./LandingPage";

class Landing extends Component {
  render() {
    return (
      <React.Fragment>
        <LandingPage {...this.props} />
      </React.Fragment>
    );
  }
}

export default Landing;
