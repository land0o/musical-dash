import React, { Component } from "react";
// import TopNav from "./navbar/TopNav";
import ApplicationViews from "./ApplicationViews";
import "./MusicalDash.css";

class MusicalDash extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <TopNav {...this.props}/> */}
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default MusicalDash;
