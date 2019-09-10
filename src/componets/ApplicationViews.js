import { Route } from "react-router-dom";
import React, { Component } from "react";
import MusicalDash from "./MusicalDash";

export default class ApplicationViews extends Component {
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/MusicalDash"
          render={props => {
            return <MusicalDash {...props} />;
          }}
        />
      </React.Fragment>
    );
  }
}
