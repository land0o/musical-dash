import React, { Component } from "react";
// import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./MusicalDash.css";

class Nutshell extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <NavBar {...this.props}/> */}
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default Nutshell;
