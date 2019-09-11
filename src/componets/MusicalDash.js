import React, { Component } from "react";
// import Sidebar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import "./MusicalDash.css";

class Nutshell extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <Sidebar {...this.props}/> */}
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default Nutshell;
